import { IImage } from 'components/ImageUpload/types';
import { MyOptionType } from 'components/Select/types';

export type IUploadImageCard = {
  title: string;
  media: IImage | null | undefined | string;
};

export enum CreatePostStep {
  UPLOAD_FILE = 1,
  ADD_CAPTION = 2,
}

export type ICreatePost = {
  media: IImage[];
  caption: string;
  tags: MyOptionType[];
};
