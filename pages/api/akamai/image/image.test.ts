import { getNetStorageImagePath } from './utils';

describe('Download Akamai Image', () => {
  it('should provide localPath imageDestination and Netstorage path', () => {
    const { imageDestination, netStoragePath, localPath } = getNetStorageImagePath('https://akamai.net/sarab/101.jpeg');
    expect(imageDestination).toBe('101.jpeg');
    expect(netStoragePath).toBe(`${process.env.NEXT_PUBLIC_AKAMAI_CPCODE}/sarab/101.jpeg`);
  });
});
