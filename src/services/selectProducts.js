const connection = require('../connection/connection');

const selectProducts = async (id) => {
  const productsSelected = await connection('products')
    .where('id_user', id)
    .select([
      'products.*'
    ]);

    return productsSelected;
}

const selectAllProducts = async () => {
  const allProductsSelected = await connection('products')
    .select([
      'products.*'
    ]);

    return allProductsSelected;
}

module.exports = {
  selectProducts,
  selectAllProducts
}
