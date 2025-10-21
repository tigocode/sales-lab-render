const connection = require('../connection/connection');

const isRepurchase = async (id_user, id_client) => {
  const repurchase = await connection('register')
    .where('id_user', id_user)
    .where('id_client', id_client)
    .select('id')
    .first();
  // Verifica se o cliente já possui uma compra

  return repurchase;
}

module.exports = {
  isRepurchase,
}
