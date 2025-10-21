const connection = require('../connection/connection');

const createGraduation = async (id_register, graduation) => {

  const insertGraduation = await connection('graduation').insert(
    graduation.map(grad => ({
      olho: grad.olho,
      esferico: grad.esferico ?? 0, 
      cilindrico: grad.cilindrico ?? 0, 
      eixo: grad.eixo ?? 0, 
      adicao: grad.adicao === '' ? 0 : grad.adicao,
      id_register: id_register
    }))
  );

  return { insertGraduation };
}
module.exports = {
  createGraduation,
}
