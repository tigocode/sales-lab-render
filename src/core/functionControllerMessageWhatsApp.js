const { connectMessengerInstance, getStatusInstance, resumeInstance } = require('../core/watLabsService');
const { generatorInstance } = require('../core/cryptoInstance');

const sendMessage = async (instance, message, to, sock = null) => {
  if (!instance || !to || !message) {
    return { error: 'Parâmetros obrigatórios: instance, to, message' };
  }

  try {
    // Se não tiver `sock`, conecta normalmente
    if (!sock) {
      const statusInstance = await getStatusInstance(instance);
      sock = statusInstance === false
        ? await resumeInstance(instance)
        : await connectMessengerInstance(instance);
    }

    await sock.sendMessage(`${to}@s.whatsapp.net`, { text: message });

    // ⚠️ Agora NÃO finaliza a instância aqui
    return {
      success: true,
      instance,
      message,
      sent_at: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error('❌ Erro ao enviar mensagem:', error);
  }
};

const createInstance = async (company, name) => {
  if (!company || !name) {
    throw new Error('Parâmetros obrigatórios: company, name');
  }

  try {
    const instance = await generatorInstance(company, name);
    return instance;
  } catch (error) {
    throw new Error('❌ Erro ao criar instância:', error);
  }
};

module.exports = {
  sendMessage,
  createInstance,
}
