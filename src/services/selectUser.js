const connection = require('../connection/connection');

const selectUser = async (id) => {
  const userSelected = await connection('users')
    .where('id', id)
    .select([
      'users.id',
      'users.company',
      'users.nome',
      'users.telefone',
      'users.email',
      'users.user',
    ]);

  return userSelected;
}

module.exports = {
  selectUser
};