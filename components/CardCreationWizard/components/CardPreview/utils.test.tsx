import { getCoverImage } from './utils';

describe('getCoverImage', () => {
  it('should return cropped image', () => {
    const result = getCoverImage({ croppedImage: 'a.jpeg', media: 'b.jpeg' });
    expect(result).toEqual('a.jpeg');
  });
  it('should return media image', () => {
    const result = getCoverImage({ croppedImage: undefined, media: 'b.jpeg' });
    expect(result).toEqual('b.jpeg');
  });
  it('should return empty', () => {
    const result = getCoverImage({ croppedImage: undefined, media: undefined });
    expect(result).toEqual('');
  });
  it('should return media image only', () => {
    const result = getCoverImage({ croppedImage: '', media: 'b.jpeg' });
    expect(result).toEqual('b.jpeg');
  });
});
