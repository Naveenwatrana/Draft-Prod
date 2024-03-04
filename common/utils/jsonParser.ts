export const stringifyToJson = (str: string) => {
  if (!str) {
    return {};
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};
