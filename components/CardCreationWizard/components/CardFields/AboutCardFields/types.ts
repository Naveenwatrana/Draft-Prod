import lang from 'common/lang';
import { Card } from 'components/CardCreationWizard/types';
import { IImage } from 'components/ImageUpload/types';
import { FieldErrors } from 'react-hook-form';
import * as yup from 'yup';
import { validateUserMediaOptional } from '../utils';

const { image } = lang.onBoarding;

export type IAboutCardFields = {
    heading: string;
    description: string;
    media: IImage | null | undefined | string;
};
export const schema = yup.object().shape({
  heading: yup.string().trim(),
  description: yup.string().trim().required('required'),
  media: yup
    .mixed()
    .test('fileSize', image.imageError, validateUserMediaOptional),
});
export type FormProps = {
    fields: {
        heading: string;
        description: string;
        media: IImage | null | undefined | string;
    };
    errors: FieldErrors<IAboutCardFields>;
    updateValue: (mantra: string, key: string) => void;
    removeMedia: () => void;
    onUploadMedia: (media: File[] | null) => void;
    withMedia?: boolean;
    selectedCard: Card;
};
