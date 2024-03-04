import { IFeedData } from 'pages/feed/types';

export type FeedProps = {
  meltwaterArticlesData?: IFeedData[] | null;
};

export enum MeltwaterCardType {
  horizontal = 'horizontal',
}

export type MeltwaterCardProps = {
  header: string;
  date?: Date;
  status: boolean;
  image?: string;
  url?: string;
  author: string;
  domain: string;
  cardType?: MeltwaterCardType;
  id: number;
  clickable?: boolean;
};
