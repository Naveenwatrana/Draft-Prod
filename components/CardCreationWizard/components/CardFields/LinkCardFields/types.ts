import lang from 'common/lang';
import { Card } from 'components/CardCreationWizard/types';
import { IImage } from 'components/ImageUpload/types';
import { FieldErrors } from 'react-hook-form';
import * as yup from 'yup';
import { validateUserMediaOptional } from '../utils';

const { image } = lang.onBoarding;

export type ILink = {
    name?: string;
    url?: string;
}

export type ILinkCardFields = {
    links: ILink[] | null;
    media: IImage | null | undefined | string;
};
export const schema = yup.object().shape({
  links: yup.array().of(
    yup.object().shape({
      name: yup.string().trim().required(),
      url: yup.string().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).required(),
    }),
  ),
  media: yup
    .mixed()
    .test('fileSize', image.imageError, validateUserMediaOptional),
});
export type FormProps = {
    fields: {
        links: ILink[];
        media: IImage | null | undefined | string;
    };
    errors: FieldErrors<ILinkCardFields>;
    removeMedia: () => void;
    onUploadMedia: (media: File[] | null) => void;
    withMedia?: boolean;
    selectedCard: Card;
    updateValue: (name: string, value: ILink[]) => void;
};
