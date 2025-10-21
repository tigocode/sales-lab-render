const connection = require("../connection/connection");

const ValidationSearchId = (searchId, id) => {
  let status;
  let code;

  if (searchId && (searchId.id === id || searchId.id_user === id)) {
    status = true;
    code = 201;
  } else {
    status = false;
    code = 401;
  }

  return {
    status: status,
    code: code,
  };
};

const UserAlreadyExist = async (id) => {
  const searchId = await connection("users")
    .where("id", id)
    .select("id")
    .first();

  const returnStatus = ValidationSearchId(searchId, id);

  return returnStatus;
};

const userServive = async (username) => {
  const userId = await connection("users")
    .where({ user: username })
    .select("id", "nome")
    .first();

  return userId;
};

const ClientAlreadyExist = async (id) => {
  const searchId = await connection("clients")
    .where("id", id)
    .select("id")
    .first();

  const returnStatus = ValidationSearchId(searchId, id);

  return returnStatus;
};

const UserLicenseAlreadyExist = async (id_user) => {
  const searchId = await connection("free_time")
    .where("id_user", id_user)
    .select("id_user")
    .first();

  const returnStatus = ValidationSearchId(searchId, id_user);

  return returnStatus;
};

const ProductAlreadyExist = async (id) => {
  const searchId = await connection("products")
    .where("id", id)
    .select("id")
    .first();

  const returnStatus = ValidationSearchId(searchId, id);

  return returnStatus;
};

module.exports = {
  UserAlreadyExist,
  ClientAlreadyExist,
  UserLicenseAlreadyExist,
  ProductAlreadyExist,
  userServive
};
