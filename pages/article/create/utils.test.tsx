import { getMediaFiles } from './utils';

describe('getMediaFiles', () => {
  it('should return empty array if no media', async () => {
    const result = await getMediaFiles([], 'sarab');
    expect(result).toEqual([]);
  });

  it('should return media files if not local', async () => {
    const result = await getMediaFiles([
      {
        type: 'IMAGE',
        fields: { media: 'https://test.com' },
      },
      {
        type: 'VIDEO',
        fields: { media: 'https://test.com' },
      },
    ], 'sarab');
    expect(result).toEqual([
      {
        type: 'IMAGE',
        fields: { media: 'https://test.com' },
      },
      {
        type: 'VIDEO',
        fields: { media: 'https://test.com' },
      },
    ]);
  });
});
