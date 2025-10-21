const connection = require('../connection/connection');

const createNewLicenca = async (id_user, start_time, end_time, remaining_time) => {
  const exists = await connection('free_time')
    .where('id_user', id_user)
    .where('remaining_time', '=', '0')
    .first();

  if (!exists) return null;

  const createTimeFree = await connection('free_time')    
    .insert({
      id_user,
      start_time,
      end_time,
      remaining_time,
      first_license: false,
      updated_license: true
    });

  return createTimeFree;
}

module.exports = {
  createNewLicenca
}
