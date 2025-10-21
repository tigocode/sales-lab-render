const jwt = require('jsonwebtoken');

const GeneratorToken = (user, JWT_SECRET) => {
  const userLog = { 'user': user }
  const token = jwt.sign(userLog, JWT_SECRET, { expiresIn: '365d' });

  return token;
};
const CheckToken = (token, JWT_SECRET, user) => {
  let status;
  let code;

  jwt.verify(token, JWT_SECRET, function(error, dateToken) {
    if(error == null && dateToken.user == user) {
      status = true;
      code = 200;
    } else {
      status = false;
      code = 401;
    }
  });

  return {
    status: status,
    code: code,
  }
}

module.exports = {
  GeneratorToken,
  CheckToken,
}
