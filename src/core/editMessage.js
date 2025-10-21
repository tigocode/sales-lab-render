const editMessage = async (message, list) => {
  const placeholders = [
    '[CLIENT]',
    '[PRODUCT]',
    '[DATA]',
    '[LINK]',
    '[COMPANY]'
  ];

  return placeholders.reduce((msg, placeholder, index) => {
    const value = list[index] || '';
    return msg.replaceAll(placeholder, value);
  }, message);
};

module.exports = {
  editMessage
}
