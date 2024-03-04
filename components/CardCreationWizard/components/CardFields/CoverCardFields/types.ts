import lang from 'common/lang';
import { IImage } from 'components/ImageUpload/types';
import { FieldErrors } from 'react-hook-form';
import * as yup from 'yup';
import { JobCoverCardFelids } from 'pages/jobs/create/types';
import { validateLogoFile, validateUserMediaOptional } from '../utils';

const { imageError } = lang.cardCreationWizard;
const {
  onBoarding: { image },
} = lang;

export type ICoverCardFields = {
    mantra: string;
    media: IImage | null | undefined | string;
    logo?: IImage | null | undefined | string;
};
export const schema = yup.object().shape({
  mantra: yup.string().trim().required('required'),
  media: yup
    .mixed()
    .test('fileSize', imageError, validateUserMediaOptional),
  logo: yup
    .mixed()
    .test('fileTypeAndSize', image.imageError, validateLogoFile),
});

export const schemaForMantraNotRequired = yup.object().shape({
  mantra: yup.string().trim(),
  media: yup
    .mixed()
    .test('fileSize', imageError, validateUserMediaOptional),
  logo: yup
    .mixed()
    .test('fileTypeAndSize', image.imageError, validateLogoFile),
});
export type FormProps = {
    fields: {
        mantra: string;
        media: IImage | null | undefined | string;
        logo?: IImage | null | undefined | string;
    };
    errors: FieldErrors<ICoverCardFields>;
    updateMantra: (mantra: string) => void;
    removeMedia: () => void;
    removeLogo?: () => void;
    onUploadMedia: (media: File[] | null) => void;
    onUploadLogo: (media: File[] | null) => void;
    withMedia?: boolean;
    withLogo?: boolean;
    jobCoverCardsData?: JobCoverCardFelids;
};
