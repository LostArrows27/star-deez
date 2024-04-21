const convertMinute = (time: number) => {
  // convert to xx hours : xx minutes

  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  // if 00 hours return only minutes
  if (hours === 0) return `${minutes} minutes`;
  return `${hours} hours : ${minutes} minutes`;
};

export default convertMinute;