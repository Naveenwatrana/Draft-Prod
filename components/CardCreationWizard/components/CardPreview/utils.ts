import { IFieldValue } from 'components/CardCreationWizard/types';

export const getCoverImage = (values: IFieldValue | undefined): string => {
  if (typeof values?.croppedImage === 'string' && values?.croppedImage !== '') {
    return values.croppedImage;
  }
  if (typeof values?.media === 'string') {
    return values.media;
  }
  return '';
};
