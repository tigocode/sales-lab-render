const { registerUser } = require('../services/createUser');
const { checkDados } = require('../validations/attributes');
const { changeUser } = require('../services/changeUser');
const { selectUser } = require('../services/selectUser');
const { UserAlreadyExist, UserLicenseAlreadyExist } = require('../validations/alreadyExist');
const { formatDate } = require('../validations/formatDate');
const { freeTime } = require('../validations/freeTime');
const { createFreeTime } = require('../services/createFreeTime');
const { registerMessage } = require('../services/createMessage');

module.exports = {
  async Index(req, res) {
    try {
      const id = req.params.user_id;

      const result = await selectUser(id);
      
      if(result.length === 0) {
        return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
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
      company,
      nome,
      telefone,
      email,
      user,
      password,
    } = req.body;

    const dadosCheck = checkDados(nome, email, telefone);

    if(dadosCheck.status) {
      const resultInsert = await registerUser(
        nome,
        telefone,
        email,
        user,
        password,
        company
      );
      
      const id_user = resultInsert;
      // Check if the user exists
      const checkId = await UserLicenseAlreadyExist(id_user);

      const { start, end } = freeTime(checkId);
      createFreeTime(resultInsert, start, end);

      return res.status(201).send(resultInsert);
    } else {
      res.status(400).send({ message: dadosCheck.message });
    }    
   } catch (error) {
    // Tratamento de duplicidade
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).send({ message: 'Telefone ou outro dado já cadastrado.' });
    }
    console.log(error);
    return res.status(500).send({
      error: {
        message: 'Ocorreu um erro ao inserir os dados.',
        log: error
      }
    });
   }
  },
  
  async Update(req, res) {
    try {
      const {
        nome,
        telefone,
        email
      } = req.body;

      const updatedAt = await formatDate();
      // Check if the user exists
      const id = parseInt(req.params.user_id);
      // Check if the user exists
      const checkId = await UserAlreadyExist(id);
      // If the user exists, update the data
      if(checkId.status) {
        // Update the user data
        const updateUserId = await changeUser(
          id,
          nome,
          telefone,
          email,
          updatedAt
        );
        return res.status(201).send({
          updateUserId
        });
      } else {
        res.status(404).send({ message: 'Usuário não encontrado.' });
      }

    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: {
          message: 'Ocorreu um erro ao inserir os dados.',
          log: error
        }
      });
    }
  },

  async saveMessage(req, res) {
    try {
      const { message, promotion } = req.body;

      
      if (!message || !promotion) {
        return res.status(400).send({ message: 'Mensagem e promoção são obrigatórios.' });
      }

      if (message.length >= 500 || promotion.length >= 255) {
        return res.status(400).send({ message: 'Mensagem e promoção devem ter um tamanho válido.' });
      }
      
      const id = parseInt(req.params.user_id);

      const createMessage = await registerMessage(message, promotion, id);

      return res.status(201).send(createMessage);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: {
          message: 'Ocorreu um erro ao registrar a mensagem.',
          log: error
        }
      });
    }
  }
};
