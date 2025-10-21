const { isRepurchase } = require('../services/isRepurchase');
const { editIsAlertSend } = require('../services/editIsAlertSend');

const alreadyPurchasedExists = async (id_user, id_client) => {
  let is_repurchase;
  // Verifica se o cliente já possui uma compra

  const alreadyPurchased = await isRepurchase(id_user, id_client);
  if(alreadyPurchased) {
    // Se o cliente já possui uma compra, atualiza o campo is_alert_sent para true
    await editIsAlertSend(alreadyPurchased.id);
  }

  if(alreadyPurchased) {
  // Se o cliente já possui uma compra, retorna true
  // Se o cliente não possui uma compra, retorna false
    is_repurchase = true;

    return is_repurchase;
  } else {
    is_repurchase = false;

    return is_repurchase;
  }
}

module.exports = {
  alreadyPurchasedExists,
}
