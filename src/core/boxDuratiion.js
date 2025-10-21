const { CategoryFilter } = require('./categoryFilter');
const { formatDate } = require('../validations/formatDate');

const calculateDuration = async (categoria, quantidade) => {
  let dateFormat;
  const totalDisposalTime = await CategoryFilter(categoria);

  const { quantidade_lente_caixa, tempo_descarte } = totalDisposalTime;
  
  const timeTotal = quantidade_lente_caixa * tempo_descarte;

  if(quantidade > 2) {
    quantidade = quantidade / 2;
   
    dateFormat = formatDate(timeTotal * quantidade);
    return dateFormat;
  } else {
    dateFormat = formatDate(timeTotal);
    return dateFormat;
  }

}

module.exports = {
  calculateDuration,
}
