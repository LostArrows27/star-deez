const padZero = (num: number) => String(num).padStart(2, "0");

export const secondsToHMS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(secs)}`;
};
