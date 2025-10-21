const { registerClient } = require("../services/createClient");
const {
  selectClients,
  selectAllClients,
} = require("../services/selectClients");
const { checkDados } = require("../validations/attributes");
const { changeClient } = require("../services/changeClient");
const {
  UserAlreadyExist,
  ClientAlreadyExist,
} = require("../validations/alreadyExist");
const { formatDate } = require("../validations/formatDate");

module.exports = {
  async Index(req, res) {
    try {
      const id = req.params.user_id;

      const result = id ? await selectClients(id) : await selectAllClients();

      if (result.length === 0) {
        return res.status(404).json({ message: "Nenhum cliente encontrado." });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return {
        error: "Ocorreu um erro ao buscar os dados.",
      };
    }
  },

  async Create(req, res) {
    try {
      const { nome, sexo, data_nascimento, email, telefone, id_user } =
        req.body;

      const dadosCheck = checkDados(nome, email, telefone);
      const idChecked = await UserAlreadyExist(id_user);

      if (dadosCheck.status && idChecked.status) {
        const resultInsert = await registerClient(
          nome,
          sexo,
          data_nascimento,
          email,
          telefone,
          id_user
        );
        return res.status(201).json(resultInsert);
      } else {
        res.status(400).send({ message: "User não existe." });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        error: {
          message: "Ocorreu um erro ao inserir os dados.",
          log: error,
        },
      });
    }
  },

  async Update(req, res) {
    try {
      const { nome, email, telefone, id_user } = req.body;

      const id = parseInt(req.params.client_id);
      const checkId = await ClientAlreadyExist(id);
      const updatedAt = await formatDate();

      if (checkId.status) {
        const updateClientId = await changeClient(
          id,
          nome,
          email,
          telefone,
          updatedAt,
          id_user
        );

        if (updateClientId === 0) {
          res
            .status(403)
            .send({
              message: "Acesso negado. Você não tem permissão para esta ação.",
            });
        } else {
          return res.status(201).send({
            updateClientId,
          });
        }
      } else {
        res.status(404).send({ message: "Cliente não encontrado." });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: "Ocorreu um erro ao atualizar os dados.",
      });
    }
  },
};
