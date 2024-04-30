const getDateStartEnd = (date: string): { start: Date; end: Date } => {
  const parsedDate = new Date(date);

  const start = new Date(parsedDate.setHours(0, 0, 0, 0));
  const end = new Date(parsedDate.setHours(23, 59, 59, 999));

  return {
    start: start,
    end: end,
  };
};

export default getDateStartEnd;
