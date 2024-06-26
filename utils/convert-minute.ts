const convertMinute = (time: number, short = false, special = false) => {
  // convert to xx hours : xx minutes

  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (special)
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;

  if (hours === 0) return short ? `${minutes}m` : `${minutes} minutes`;
  return short ? `${hours}h ${minutes}m` : `${hours} hours ${minutes} minutes`;
};

export default convertMinute;
