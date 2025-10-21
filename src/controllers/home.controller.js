const { CheckToken } = require("../services/token");
const { createHash } = require("../validations/auth");
const { userServive } = require("../validations/alreadyExist");

module.exports = {
  async Index(req, res) {
    let { user, password, token } = req.body;

    const JWT_SECRET = createHash(password);
    const tokenChecked = CheckToken(token, JWT_SECRET, user);

    if (!tokenChecked.status) {
      res.status(tokenChecked.code).send({ access: tokenChecked.status });
      return;
    }
    const userData = await userServive(user);

    return res.status(tokenChecked.code).send({
      id: userData.id,
      nome: userData.nome,
      access: tokenChecked.status,
    });
  },
};
