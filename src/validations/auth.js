const crypto = require('crypto');

const createHash =  (password) => {
  const JWT_SECRET = crypto.createHash('md5').update(password).digest('hex');

  return JWT_SECRET;
}

module.exports = {
  createHash,
}
