const { searchUser, changePassword } = require('../services/selectToken');

module.exports = {
  async Create(req, res) {
    try {
      const {
        user,
        password,
      } = req.body;

      const userLocated = await searchUser(user, password);

      return res.status(200).send( userLocated );
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: 'Ocorreu um erro ao realizar o login, verifique os dados.'
      });
    }
  },

  async Update(req, res) {
    try {
      const { email, password } = req.body;

      const userLocated = await changePassword(email, password);
      
      return res.status(200).send( userLocated );
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: 'Ocorreu um erro ao mudar a senha.'
      });
    }
  }
};
