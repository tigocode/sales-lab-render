const connection = require('../connection/connection');
const { GeneratorToken } = require('./token');
const crypto = require('crypto');

const searchUser = async (user, password) => {
  const hash = crypto.createHash('md5').update(password).digest('hex');
  password = hash;

  const selectUser = await connection('users')
    .where('user', user)
    .where('password', password)
    .where('user_active', 1)
    .select([
      'users.token'
    ])
    .first();
  
  if(selectUser === undefined) {
    return { token: `${password}we23Aa3WGmIGA4A_6C.${password}.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoi` }
  }

  return selectUser;
};

const changePassword = async (email, password) => {
  const JWT_SECRET = crypto.createHash('md5').update(password).digest('hex');
  password = JWT_SECRET;
  
  const selectUser = await connection('users')
  .where('email', email)
  .select('user')
  .first();
  
  if(!selectUser) {
    return { message: 'Email invalido, nenhum usuário encontrado.' }
  }
  
  const token = GeneratorToken(selectUser.user, JWT_SECRET);
  const changePassword = await connection('users')
    .where('user', selectUser.user)
    .where('email', email)
    .update({
      password,
      token
    });

  return { message: `Password do user_id: ${ changePassword } alterado com sucesso.` };
};

module.exports = {
  searchUser,
  changePassword,
}
