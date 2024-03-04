import { stringifyToJson } from './jsonParser';

describe('stringifyToJson', () => {
  it('should return json object', () => {
    const json = stringifyToJson('{"name": "John"}');
    expect(json).toEqual({ name: 'John' });
  });

  it('should return empty object', () => {
    const json = stringifyToJson('{"name": "John"');
    expect(json).toEqual({});
  });
});
