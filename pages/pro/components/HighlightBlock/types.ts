import { IImage } from 'components/ImageUpload/types';
import { FieldErrors } from 'react-hook-form';
import { BlocksEntity } from '../../types';

export type IHighlightBlockFormValues = {
    title: string;
    media: IImage | null | undefined | string;
};

export type HighlightBlockFormProps = {
  register: any;
  handleSubmit: any;
  withMedia: boolean;
  block?: BlocksEntity;
  formFields: {
    title: string;
    media: IImage | null | undefined | string;
  };
  errors: FieldErrors<IHighlightBlockFormValues>;
  onUploadMedia: (file: File[]) => void;
  removeMedia: () => void;
  onClose: () => void;
};
export type HighlightBlockViewProps = {
  media: string;
  title?: string;
  onDelete: () => void;
  setEditBlock: (e: boolean) => void;
  id?: number;
  block: BlocksEntity;
  setSkip: () => void;
  isOwnProfile?: boolean;
  editOnClick?: boolean;
  width?: number;
  height?: number;
};
export type VideoElementProps = {
  media: string;
};
export type VideoContainerProps = {
  withTitle: boolean;
};
