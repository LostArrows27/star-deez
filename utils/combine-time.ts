const combineTime = (date: Date, time: Date) => {
  const combinedDateTime = new Date(date);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  combinedDateTime.setHours(hours);
  combinedDateTime.setMinutes(minutes);
  combinedDateTime.setSeconds(seconds);
  combinedDateTime.setMilliseconds(milliseconds);

  return combinedDateTime;
};

export default combineTime;
