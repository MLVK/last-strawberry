const minutesToTime = raw => {

  const hours = raw % 60;
  const minutes = raw - (hours * 60);

  if(_.isFinite(hours) && _.isFinite(minutes)) {
    return moment()
      .hours(hours)
      .minutes(minutes).format('hh:mma');
  } else {
    return '';
  }
}

const timeToMinutes = time => {
  const elements = time.split(':');

  if(elements.length === 2){
    const hours = parseInt(elements[0], 10);
    const minutes = parseInt(elements[1], 10);

    return hours * 60 + minutes;
  }

  return 0;
}

export {
  minutesToTime,
  timeToMinutes
}
