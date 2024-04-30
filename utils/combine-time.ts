const combineTime = (date: Date, time: Date) => {
  const locale = date.toLocaleDateString();

  const [month, day, year] = locale.split("/").map(Number);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  const combinedDateTime = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  );

  return combinedDateTime;
};

export default combineTime;
