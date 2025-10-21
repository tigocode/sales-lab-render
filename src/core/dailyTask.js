const cron = require('node-cron');
const { executarRotina } = require('../services/changeFreeTime');
const { calculateNextAlert } = require('../core/sendAlert');

const taskDaily = async () => {
  // Rotina automatizada que chama a função startRoutine (Rotina diária).
  await executarRotina();
  const result =  await calculateNextAlert();
  console.log('Resultado da rotina diária:', result);
}

const startRoutine = () => {
  // Executa todos os dias às 01:01 da manhã
  cron.schedule('43 22 * * *', taskDaily);
}

module.exports = {
  startRoutine
};

