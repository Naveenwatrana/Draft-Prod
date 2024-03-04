import { ICard } from 'pages/feed/types';

export type ICommentDataResponse = {
  id: number;
  comment: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  commenter: ICommenterResponse;
};

export type ICommenterResponse = {
  id: string;
  first_name?: string;
  last_name?: string;
  profile_cover?: string;
  name: string;
  presigned_profile_cover?: string;
  logo?: string;
  cards?: ICard[];
};

export type IComment = {
  id: number;
  comment: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  commenter: ICommenterResponse;
};
