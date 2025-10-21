const connection = require('../connection/connection');

const changeClient = async (id, nome, email, telefone, updatedAt, id_user) => {
  const clientChange = await connection('clients')
    .where('id_user', id_user)
    .where('id', id)
    .update({
      nome,
      email,
      telefone,
      updatedAt
    });
  
    return clientChange;
}

module.exports = {
  changeClient,
}
