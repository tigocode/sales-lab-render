const freeTime = (checkId, remaining_time) => {
  const date = new Date();
  let start;
  let end;
  
  while(!start || !end) {
    if(!start) {
      const data = date.toISOString().slice(0, 10);
      const hora = date.toTimeString().split(' ')[0]

      start = `${data} ${hora}`;
    } else {

      if(checkId.status) {
        date.setDate(date.getDate() + parseInt(remaining_time));
        const data = date.toISOString().slice(0, 10);
        const hora = date.toTimeString().split(' ')[0]
  
        end = `${data} ${hora}`;
      } else {
        date.setDate(date.getDate() + 90);
        const data = date.toISOString().slice(0, 10);
        const hora = date.toTimeString().split(' ')[0]
  
        end = `${data} ${hora}`;
      }
    }
  }
  return { start, end };
}

module.exports = {
  freeTime,
}
