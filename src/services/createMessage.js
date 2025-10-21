const connection = require('../connection/connection');

const registerMessage = async (message, promotion, id_user) => {
  const createMessage = await connection('messageMkt')
    .insert({
      message_default: message,
      message_promotion: promotion,
      id_user
    });

  return createMessage;
}

module.exports = {
  registerMessage
}
