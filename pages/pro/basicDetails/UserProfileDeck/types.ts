import { ICard } from 'pages/feed/types';

export type UserProfileDeckProps = {
    data: {
        id: string;
        cards: ICard[];
    },
    onCardClick?: any;
    setEditImageDetail: (value: boolean) => void;
};
