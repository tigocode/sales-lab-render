const connection = require('../connection/connection');

const editIsAlertSend = async (id) => {
  const editRegister = await connection('register')
    .where('id', id)
    .update({
      is_alert_sent: true,
      data_send_alert: new Date(),
    });

  return editRegister;
}

module.exports = {
  editIsAlertSend,
}
