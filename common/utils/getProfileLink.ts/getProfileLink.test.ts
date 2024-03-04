import { getUserProfileUrl } from './index';

describe('getUserProfileUrl', () => {
  it('should return user profile url', () => {
    const isCompanyAuthor = false;
    const userId = '123';
    const expected = `/pro/${userId}`;
    const actual = getUserProfileUrl(isCompanyAuthor, userId);
    expect(actual).toEqual(expected);
  });

  it('should return org profile url', () => {
    const isCompanyAuthor = true;
    const userId = '123';
    const expected = `/org/${userId}`;
    const actual = getUserProfileUrl(isCompanyAuthor, userId);
    expect(actual).toEqual(expected);
  });

  it('should return empty string', () => {
    const isCompanyAuthor = false;
    const userId = '';
    const expected = '';
    const actual = getUserProfileUrl(isCompanyAuthor, userId);
    expect(actual).toEqual(expected);
  });
});
