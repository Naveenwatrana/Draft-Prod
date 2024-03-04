export const getUniqueValuesFromTwoArrays = (arr1: string[], arr2: string[]) => {
  const uniqueValues = arr2.filter((value) => !arr1.includes(value));
  return uniqueValues;
};
