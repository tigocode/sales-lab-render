const connection = require('../connection/connection');

const createRegister = async (produto, categoria, quantidade, data_recompra, is_repurchase, id_client, id_user) => {
  const id = await connection('register').insert({
    produto,
    categoria,
    quantidade,
    data_recompra,
    is_repurchase,
    is_alert_sent: false,
    alert_count: 0,
    data_send_alert: '0000-00-00 00:00:00', // Default date, can be updated later
    id_client,
    id_user
  });

  return  id;
}

module.exports = {
  createRegister,
}
