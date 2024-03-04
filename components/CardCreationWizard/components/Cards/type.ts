import { ITag } from 'pages/article/view/types';

export type PostCard = {
  media: string[];
  caption: string;
  tags: ITag[];
};

export type PostCardsProps = {
  card: PostCard;
};
