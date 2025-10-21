const connection = require('../connection/connection');

const selectRegister = async (id) => {
  const registerSelected = await connection('register')
    .join('graduation', 'register.id', '=', 'graduation.id_register')
    .where('id_user', id)
    .select([
      'register.*',
      'graduation.*'
    ]);

    return registerSelected;
}

const selectAllRegister = async () => {
  const allRegisterSelected = await connection('register')
    .join('graduation', 'register.id', '=', 'graduation.id_register')
    .select([
      'register.*',
      'graduation.*'
    ]);

    return allRegisterSelected;
}

module.exports = {
  selectRegister,
  selectAllRegister
}
