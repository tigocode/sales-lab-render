const substractedDay = (remainingTimeList) => {

  // fluxo que subtrai 1 do remaining_time de todos os registros
  const updateList = remainingTimeList.map((item) => {
    const newtime = Math.max(parseInt(item.remaining_time) - 1, 0);
    return {
      id: item.id,
      remaining_time: String(newtime),
    };
  });

  return updateList;
}

module.exports = {
  substractedDay,
}
