function formatTime(minutes: number): string {
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const remainingMinutes = minutes % 60;

  let result = "";
  if (days > 0) result += `${days}d `;
  if (days > 0 || hours > 0) result += `${hours}h `;
  result += `${remainingMinutes}m`;

  return result.trim();
}

export default formatTime;
