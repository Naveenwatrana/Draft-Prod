import { filteredDomainName } from './util';

describe('Meltwater feed', () => {
  it('should filter out domain name', () => {
    const data = filteredDomainName('www.draft-io.com');
    expect(data).toStrictEqual('draft-io.com');
  });
});
