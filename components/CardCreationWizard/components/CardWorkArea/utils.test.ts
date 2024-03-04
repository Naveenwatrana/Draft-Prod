import { getImageCropSize, isAkamaiImage } from './utils';

describe('Get Akamai Image', () => {
  it('should return if the images is hosted on akamai server', () => {
    const image = isAkamaiImage(`${process.env.NEXT_PUBLIC_AKAMAI_LINK}/sarab/101.jpeg`);
    expect(image).toBe(true);
  });
  it('should return false if the images is hosted on local server', () => {
    const image = isAkamaiImage('https://localhost:3000/sarab/101.jpeg');
    expect(image).toBe(false);
  });
});

describe('Image crop size', () => {
  it('should return crop size if the image', () => {
    const size = getImageCropSize(1920, 1080);
    expect(size).toEqual({
      height: 780,
      width: 440,
    });
  });
});
