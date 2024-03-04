import { Card } from 'components/CardCreationWizard/types';

export type ArticleCardsProps = {
    cards: Card[];
    selectCard: (card: Card) => void;
    addNewCard: () => void;
    maxCards?: number;
    className?: string;
};

export type ContainerProps = {
    active?: boolean;
    width?: string;
    height?: string;
};
