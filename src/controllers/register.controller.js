const { calculateDuration } = require('../core/boxDuratiion');
const { selectRegister, selectAllRegister } = require('../services/selectRegister');
const { createRegister } = require('../services/createRegister');
const { createGraduation } = require('../services/createGraduation');
const { alreadyPurchasedExists } =  require('../validations/alreadyPurchasedExists');

module.exports = {
  async Index(req, res) {
    try {
      const id = req.params.user_id;

      const result = id ? await selectRegister(id) : await selectAllRegister();

      if(result.length === 0) {
        return res.status(404).json({ message: 'Nenhum registro encontrado.' });
      }
      
      return res.status(200).json(result);
      
    } catch (error) {
      console.log(error);
      return {
        error: 'Ocorreu um erro ao buscar os dados.'
      };
    }
  },

  async Create(req, res) {
    try {
      const {
        produto,
        categoria,
        graduation,
        quantidade,
        id_client,
        id_user
      } = req.body;

      const is_repurchase = await alreadyPurchasedExists(id_user, id_client);

      const data_recompra = await calculateDuration(categoria, quantidade);

      const id_register = await createRegister(
        produto,
        categoria,
        quantidade,
        data_recompra,
        is_repurchase,
        id_client,
        id_user
      );      
      await createGraduation(id_register, graduation);

      res.status(200).json(id_register);

    } catch (error) {
      console.log(error);
      return res.status(400).send({
        error: {
          message: 'Ocorreu um erro ao inserir os dados.',
          log: error
        }
      });
    }
  }
}
