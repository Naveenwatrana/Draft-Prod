import { publishedDate } from './getPublishedDate';

describe('publishedDate', () => {
  it('should return empty string if no createdAt', () => {
    expect(publishedDate()).toEqual('');
  });
  it('should return empty string if no shouldBeVisible', () => {
    expect(publishedDate('2020-01-01')).toEqual('');
  });
  it('should return empty string if shouldBeVisible is false', () => {
    expect(publishedDate('2020-01-01', false)).toEqual('');
  });
  it('should return formatted date if createdAt and shouldBeVisible', () => {
    expect(publishedDate('2020-01-01', true)).toEqual('1 Jan 2020');
  });
});
