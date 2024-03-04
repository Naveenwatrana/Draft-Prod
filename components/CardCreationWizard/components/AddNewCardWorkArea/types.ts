import { CardType } from 'components/CardCreationWizard/types';

export type AddNewCardWorkAreaProps = {
    cardData: CardType[];
    addNewCard: (card: CardType) => void;
};
