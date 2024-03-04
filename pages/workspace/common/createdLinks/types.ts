import { ISavedCard } from 'pages/workspace/type';

export type UserCreatedPostsProps = {
    card: ISavedCard;
    handlePublish: (isPublished: string | null, id: number) => Promise<void>;
    success: boolean;
};

export type CreatedPostsProps = {
  cards: ISavedCard[];
};
