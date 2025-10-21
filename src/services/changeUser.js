const connection = require('../connection/connection');

const changeUser = async (id, nome, telefone, email, updatedAt) => {
  const userChange = await connection('users')
    .where('id', id)
    .update({
      nome,
      telefone,
      email,
      updatedAt
    });

  return userChange;
}

module.exports = {
  changeUser,
}
