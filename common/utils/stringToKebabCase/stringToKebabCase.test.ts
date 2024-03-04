import { stringToKebabCase } from '.';

describe('stringToKebabCase', () => {
  it('should convert string to kebab case', () => {
    expect(stringToKebabCase('This is a test')).toEqual('this-is-a-test');
  });
  it('should return blank string if null value given', () => {
    expect(stringToKebabCase(null)).toEqual('');
  });
  it('should return blank string if undefined value given', () => {
    expect(stringToKebabCase(undefined)).toEqual('');
  });
  it('should return blank string if empty string value given', () => {
    expect(stringToKebabCase('')).toEqual('');
  });
});
