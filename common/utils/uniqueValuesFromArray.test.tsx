import { getUniqueValuesFromTwoArrays } from './uniqueValuesFromArray';

describe('getUniqueValuesFromTwoArrays', () => {
  it('should return unique values from array', () => {
    const matchedSkills = ['a', 'b', 'c', 'g'];
    const allSkills = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const expected = ['d', 'e', 'f', 'h'];
    const result = getUniqueValuesFromTwoArrays(matchedSkills, allSkills);
    expect(result).toEqual(expected);
  });
});
