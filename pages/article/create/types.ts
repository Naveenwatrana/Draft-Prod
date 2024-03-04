import { IImage } from 'components/ImageUpload/types';

export enum ArticleSteps {
  CREATE = 1,
  TAGS = 2,
  PREVIEW = 3,
}

export enum ArticleStepsMobile {
  CREATE = 1,
  CARDS = 2,
  TAGS = 3,
  PREVIEW = 4,
}

export type IArticleAPIPayload = {
  content: string,
  tags: { value: string }[],
  title: string,
  subTitle: string,
  media: IImage;
  published_date: string,
};

export type IArticleHookResponse = { success: boolean, response?: string, error?: Error };
export type ApiCard = {type: string, fields: any, id?: number};
