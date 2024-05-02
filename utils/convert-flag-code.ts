const convertFlag = (code: string, width = 16, height = 12) => {
  return `https://flagcdn.com/${width}x${height}/${code}.png`;
};

export default convertFlag;
