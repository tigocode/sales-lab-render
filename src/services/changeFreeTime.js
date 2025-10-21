const connection = require('../connection/connection');
const { substractedDay } = require('../core/subtractedDay');

const selectFirstLicense = async () => {
  const remainingTimeList = await connection('free_time')
    .where('first_license', '=', 1)
    .select([
      'free_time.*'
    ]);

  return remainingTimeList;
}

const selectUpdatedLicense = async () => {
  const remainingTimeList = await connection('free_time')
    .where('updated_license', '=', 1)
    .select([
      'free_time.*'
    ]);

  return remainingTimeList;
}

async function updateRemainingTime() {
  const firstList = await selectFirstLicense();
  const updatedList = await selectUpdatedLicense();
  // Juntando os dois arrays
  const remainingTimeList = [...firstList, ...updatedList];
  // chamando a função selectRemaingTime
  const newRemainingTime = await substractedDay(remainingTimeList);
  // chamando a rotina subtractDay

  await Promise.all(newRemainingTime.map(async (item) => {
    await connection('free_time')
      .where('id', item.id)
      .update({
        remaining_time: item.remaining_time,
      });
  }));
};

async function updateStatusFristLicense() {
  const firstList = await selectFirstLicense();
  const updatedList = await selectUpdatedLicense();
  // Juntando os dois arrays
  const remainingTimeList = [...firstList, ...updatedList];
  // chamando a função selectRemaingTime

  await Promise.all(remainingTimeList.map(async (item) => {
    await connection('free_time')
      .where('id', item.id)
      .where('remaining_time', '=', '0')
      .update({
        first_license: 0,
        updated_license: 0,
      });
  }));
};

// Função principal para executar as duas atualizações
async function executarRotina() {
  await updateRemainingTime();
  await updateStatusFristLicense();
}

module.exports = {
  executarRotina,
};
