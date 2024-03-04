import { getHeaders } from './getApiHeaders';

describe('getHeaders', () => {
  it('should return an object with a headers property', () => {
    const result = getHeaders('token');
    expect(result).toHaveProperty('headers');
  });
  it('should return an object with a headers property that has an Authorization property', () => {
    const result = getHeaders('token');
    expect(result.headers).toHaveProperty('Authorization');
  });
  it('should return an object with a headers property that has an Authorization property with a value of `Bearer token`', () => {
    const result = getHeaders('token');
    expect(result.headers.Authorization).toEqual('Bearer token');
  });
});
