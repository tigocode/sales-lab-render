const formatDate = (timeTotal) => {
  const date = new Date();
  if(timeTotal) {
    date.setDate(date.getDate() + timeTotal);

    const data = date.toISOString().slice(0, 10); // 2021-09-01
    const hora = date.toTimeString().split(' ')[0]; // 20:00:00

    return `${data} ${hora}`;
  } else {
    const data = date.toISOString().slice(0, 10); // 2021-09-01
    const hora = date.toTimeString().split(' ')[0]; // 20:00:00

    return `${data} ${hora}`;
  }
}

module.exports = {
  formatDate,
}
