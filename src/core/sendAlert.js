const connection = require('../connection/connection');
const { createInstance, sendMessage } = require('../core/functionControllerMessageWhatsApp');
const { editIsAlertSend } = require('../services/editIsAlertSend');
const { editMessage } = require('../core/editMessage');
const { connectMessengerInstance, finalizeInstance } = require('../core/watLabsService');

const alertNext = async () => {
  const listRegister = await connection('register')
    .join('clients', 'register.id_client', '=', 'clients.id')
    .where('is_alert_sent', '=', 0)
    .select([
      'register.*',
      'clients.*'
    ]);

  return listRegister;
}

const calculateNextAlert = async () => {
  const date = new Date();
  const list = await alertNext();

  const nextAlert = list.map((item) => {
    const dataRecompra = new Date(item.data_recompra);
    const differenceMinute = dataRecompra - date;
    const differenceDay = Math.floor(differenceMinute / (1000 * 60 * 60 * 24));

    return {
      ...item,
      diasRestantes: differenceDay,
    }
  });

  // Agrupa por usuário/instância para evitar reconexões repetidas
  const agrupadoPorUsuario = {};

  for (const item of nextAlert) {
    const userId = item.id_user;

    if (!agrupadoPorUsuario[userId]) {
      agrupadoPorUsuario[userId] = {
        user: null,
        mensagens: [],
      };
    }

    agrupadoPorUsuario[userId].mensagens.push(item);
  }

  for (const [userId, dados] of Object.entries(agrupadoPorUsuario)) {
    const userInstance = await connection('users')
      .join('messageMkt', 'users.id', '=', 'messageMkt.id_user')
      .where('users.id', userId)
      .select(['*'])
      .first();

    if (!userInstance) {
      console.warn(`Usuário não encontrado para ID: ${userId}`);
      continue;
    }

    const instance = await createInstance(userInstance.company, userInstance.nome);
    const sock = await connectMessengerInstance(instance); // conecta só uma vez

    for (const item of dados.mensagens) {
      if (item.diasRestantes >= 0 && item.diasRestantes <= 15) {
        if (parseInt(item.alert_count) <= 3 && item.is_alert_sent == false) {
          const diasPermitidos = [15, 10, 5];
          if (diasPermitidos.includes(item.diasRestantes)) {
            const data = [
              item.nome, item.produto,
              formatDate(item.data_recompra),
              'www.teste.com.br',
              userInstance.company
            ];
            const endMessage = await editMessage(userInstance.message_default, data);
            await sendMessage(instance, endMessage, `55${item.telefone}`, sock);
            await UpdateAlertCount(item.id, item.alert_count);
          }
        } else {
          await editIsAlertSend(item.id);
        }
      }
    }

    // Finaliza a instância do usuário após todas as mensagens
    await finalizeInstance(instance);
  }

  return nextAlert;
}

const UpdateAlertCount = async (id, alert_count) => {
  const calculateAlertCount = String(parseInt(alert_count) + 1);

  await connection('register')
    .where('id', id)
    .update({
      alert_count: calculateAlertCount,
    });
};

const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

module.exports = {
  calculateNextAlert,
}
