require('dotenv').config();

const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');
const { S3Client, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const fs = require('fs-extra');
const path = require('path');
const connec = require('../connection/connection');

const { promisify } = require('util');
const Stream = require('stream');
const pipeline = promisify(Stream.pipeline);


let sock;
const S3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const connectMessengerInstance = async (instance) => {
  try {
    const authPath = await downloadAuthFromS3(instance);
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState(authPath);

    sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false,
      shouldSyncHistoryMessage: (msg) => true,
    });

    sock.ev.on('creds.update', saveCreds);

    // ✅ Aguarda até a conexão ser aberta antes de retornar o socket
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('⏰ Timeout ao conectar com WhatsApp')), 10000);

      sock.ev.on('connection.update', async (update) => {
        if (update.connection === 'open') {
          clearTimeout(timeout);
          await validateInstance(instance);
          console.log(`🟢 Instância '${instance}' conectada com sucesso`);
          resolve();
        }

        if (update.connection === 'close') {
          const statusCode = lastDisconnect?.error?.output?.statusCode;
          const loggedOut = statusCode === DisconnectReason.loggedOut;

          console.log('🔌 Conexão encerrada, por:', statusCode);

          if (loggedOut) {
            await removeAuthFolder(instance);
          }
          clearTimeout(timeout);
          reject(new Error(`❌ Conexão fechada: ${update.lastDisconnect?.error?.message || 'desconhecido'}`));
        }
      });
    });

    return sock;
  } catch (err) {
    console.error(`❌ Erro ao conectar instância "${instance}":`, err.message);
    throw err;
  }
};

const downloadAuthFromS3 = async (instance) => {
  const authPath = path.resolve(__dirname, '..', 'auth', instance);
  await fs.ensureDir(authPath);

  const bucket = process.env.AWS_S3_BUCKET;
  const prefix = `auth/${instance}/`;

  const listCommand = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
  });

  const listResult = await S3.send(listCommand);
  const files = listResult.Contents;

  if (!files || files.length === 0) {
    throw new Error(`⚠️ Nenhum arquivo encontrado para instância "${instance}" no S3`);
  }

  for (const file of files) {
    const key = file.Key;
    const fileName = path.basename(key);
    const filePath = path.join(authPath, fileName);

    const getCommand = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const data = await S3.send(getCommand);
    await pipeline(data.Body, fs.createWriteStream(filePath));

    console.log(`✅ Arquivo "${fileName}" baixado com sucesso para "${filePath}"`);
  }

  return authPath;
};

const finalizeInstance = async (instance) => {
  const authPath = path.resolve(__dirname, '..', 'auth', instance);
  const requiredFiles = ['creds.json'];
  const hasRequiredFiles = requiredFiles.every(file =>
    fs.existsSync(path.join(authPath, file))
  );

  if (!hasRequiredFiles) {
    console.warn('⚠️ Credenciais incompletas, adiando upload e logout.');
    return;
  }

  try {
    await pauseInstance(instance);
    await removeAuthFolder(instance);
  } catch (err) {
    console.error('❌ Erro no finalizeInstance:', err.message);
  }
};

const removeAuthFolder = async (instance) => {
  const authPath = path.resolve(__dirname, '..', 'auth', instance);
  console.log(`🕵️ Tentando remover pasta: ${authPath}`);

  try {
    await new Promise((res) => setTimeout(res, 2000)); // só pra simular espera

    if (await fs.pathExists(authPath)) {
      await fs.remove(authPath);
      console.log(`✅ Pasta ${authPath} removida com sucesso!`);
    } else {
      console.warn(`⚠️ Pasta ${authPath} não existe.`);
    }
  } catch (err) {
    console.error(`❌ Erro ao remover pasta: ${err.message}`);
  }
};

const pauseInstance = async (instance) => {
  try {
    sock.ev.removeAllListeners('messages.upsert');
    sock.ev.removeAllListeners('connection.update');
    sock.ev.removeAllListeners('creds.update');

    // Fecha o WebSocket se estiver aberto
    sock.ws.close();
    await new Promise(r => setTimeout(r, 1000)); // Aguarda um segundo para garantir que o WebSocket foi fechado
    console.log(`🛑 WebSocket da instância '${instance}' foi fechado.`);

    await validateInstance(instance);

    console.log(`⚠️ Instância '${instance}' pausada`);
  } catch (error) {
    console.error('❌ Erro ao pausar instância:', error.message);
  }
};

const getStatusInstance = async (instance) => {
  try {
    const status = await connec('instances')
      .where({ instance })
      .select('status')
      .first();

    const rsStatus = status === undefined ? false : status.status;

    return rsStatus;
  } catch (error) {
    console.error('❌ Erro ao obter status da instância:', error.message);
  }
};

const resumeInstance = async (instance) => {
  try {
    const status = await getStatusInstance(instance);
    if (status === false) {
      console.log(`ℹ️ Instância '${instance}' está pausada. Reativando...`);
      return await connectMessengerInstance(instance);
    } else {
      console.log(`✅ Instância '${instance}' já está ativa.`);
    }

    return await connectMessengerInstance(instance);
  } catch (error) {
    console.error('❌ Erro ao retomar instância:', error.message);
  }
};

const validateInstance = async (instance) => {
  try {
    const payload = {
      status: false,
      updated_at: connec.fn.now(),
    };

    const exists = await connec('instances')
      .where({ instance })
      .first();

    if (exists) {
      await connec('instances')
        .where({ instance })
        .update(payload);
    } else {
      await connec('instances')
        .insert({ instance });
    }
  } catch (error) {
    console.error('❌ Erro ao validar instância:', error.message);
    throw error;
  }
}

module.exports = {
  connectMessengerInstance,
  finalizeInstance,
  getStatusInstance,
  resumeInstance
}
