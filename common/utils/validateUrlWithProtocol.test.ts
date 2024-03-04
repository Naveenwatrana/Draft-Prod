import { validateUrlWithProtocol } from './validateUrlWithProtocol';

describe('validateUrlWithProtocol', () => {
  it('should return url with https:// protocol if not present', () => {
    const expectedResult = 'https://www.google.com';
    const urlUnderTest = 'www.google.com';

    const result = validateUrlWithProtocol(urlUnderTest);

    expect(result).toEqual(expectedResult);
  });

  it('should return url with https:// protocol', () => {
    const expectedResult = 'https://www.google.com';
    const urlUnderTest = 'https://www.google.com';

    const result = validateUrlWithProtocol(urlUnderTest);

    expect(result).toEqual(expectedResult);
  });
});
