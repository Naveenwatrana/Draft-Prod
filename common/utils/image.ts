import { IImage } from 'components/ImageUpload/types';

export const getImageName = (image: string) => {
  const img = image.split('?')[0].split('/');
  return img[img.length - 1];
};
export const getImageExtension = (image: string) => {
  if (!image) {
    return '';
  }
  return image.split('.')[1];
};
export const getFileName = (media: string | IImage) => {
  if (typeof media === 'string') {
    return getImageName(media || '');
  }
  return media.file.name;
};
