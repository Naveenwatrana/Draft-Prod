export const validateUrlWithProtocol = (value: string) => {
  const validUrl = value.includes('http') && value.includes('://');
  if (!validUrl) {
    return `https://${value}`;
  }
  return value;
};
