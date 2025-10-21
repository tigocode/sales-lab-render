const connection = require('../connection/connection');
const crypto = require('crypto');
const { GeneratorToken } = require('./token');

const registerUser = async (nome, telefone, email, user, password, company) => {
  const JWT_SECRET = crypto.createHash('md5').update(password).digest('hex');
  password = JWT_SECRET;
  const token = GeneratorToken(user, JWT_SECRET);

  const createUser = await connection('users')
    .insert({
      company,
      nome,
      telefone,
      email,
      user,
      password,
      token
    });

  return createUser;
}

module.exports = {
  registerUser
}
