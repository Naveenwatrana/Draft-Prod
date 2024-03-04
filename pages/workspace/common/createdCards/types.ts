import { ISavedCard } from 'pages/workspace/type';

export type UserCreatedCardsProps = {
    card: ISavedCard;
    handlePublish: (isPublished: string | null, id: number) => Promise<void>;
    success: boolean;
};
