import path from 'path';

export const getNetStorageImagePath = (source: string) => {
  let lastSlashIndex = source.lastIndexOf('/');
  let sourceSubstring = source.substring(0, lastSlashIndex);
  const imageDestination = source.substring(lastSlashIndex + 1, source.length);
  lastSlashIndex = sourceSubstring.lastIndexOf('/');
  sourceSubstring = source.substring(lastSlashIndex + 1, source.length);
  const netStoragePath = `${process.env.NEXT_PUBLIC_AKAMAI_CPCODE}/${sourceSubstring}`;
  const localPath = path.join(`${process.cwd()}/public`, '/images', `/${imageDestination}`);

  return {
    imageDestination, netStoragePath, localPath,
  };
};
