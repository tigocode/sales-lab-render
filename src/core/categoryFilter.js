const connection = require('../connection/connection');

const CategoryFilter = async (categoria) => {
  const tempoDescarte = await connection('discard_type')
    .where('categoria', categoria)
    .select([
      'discard_type.quantidade_lente_caixa',
      'discard_type.tempo_descarte'
    ])
    .first();
  
  return tempoDescarte;
}

module.exports = {
  CategoryFilter
}
