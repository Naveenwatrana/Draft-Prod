import { IImage } from 'components/ImageUpload/types';
import { MyOptionType } from 'components/Select/types';

export type ICreateArticle = {
  media: IImage[] | string | null;
  caption: string;
  tags: MyOptionType[];
  title: string;
  content: string;
};
