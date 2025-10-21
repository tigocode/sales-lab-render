const connection = require('../connection/connection');

const changeProduct = async (id, modelo, fabricante, categoria, valor_unitario, valor_revenda, updatedAt, id_user) => {
  const productChange =  await connection('products')
    .where('id_user', id_user)
    .where('id', id)
    .update({
      modelo,
      fabricante,
      categoria,
      valor_unitario,
      valor_revenda,
      updatedAt
    });
  
  return productChange;
};

module.exports = {
  changeProduct,
}
