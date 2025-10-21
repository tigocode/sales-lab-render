const connection = require('../connection/connection');

const selectClients = async (id) => {
  const clientsSelected = await connection('clients')
    .where('id_user', id)
    .select([
      'clients.*'
    ]);

  return clientsSelected;
}

const selectAllClients = async () => {
  const allClientsSelected = await connection('clients')
    .select([
      'clients.*'
    ]);

  return allClientsSelected;
}

module.exports = {
  selectClients,
  selectAllClients
}
