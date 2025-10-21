const { freeTime } = require('../validations/freeTime');
const { UserLicenseAlreadyExist } = require('../validations/alreadyExist');
const { createNewLicenca } = require('../services/createNewLicenca');

module.exports = {
  async Create(req, res) {
    try {
      const  { id_user, remaining_time } = req.body;
      const checkId = await UserLicenseAlreadyExist(id_user);
      
      const { start, end } = freeTime(checkId, remaining_time);

      const id = createNewLicenca(id_user, start, end, remaining_time);

      return res.status(201).send(id);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: {
          message: 'Ocorreu um erro ao alterar os dados.',
          log: error
        }
      });
    }
  }
}
