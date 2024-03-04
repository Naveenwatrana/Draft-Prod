import { Card, CardType } from 'components/CardCreationWizard/types';
import { JobCoverCardFelids } from 'pages/jobs/create/types';

export type WorkAreaMobileProps = {
    onAddNewCard: () => void;
    cards: Card[];
    onSelectCard: (card: Card) => void;
    selectedCard: Card;
    isAddCardEnabled: boolean;
    addCardModal: boolean;
    createNewCard: (card: CardType) => void;
    cardData: CardType[];
    currentStep: number;
    closeModal: () => void;
    addMediaText: string;
    setCurrentStep: (step: number) => void;
    cancelAddCard: () => void;
    maxCards?: number;
    title: string;
    onClose: () => void;
    saveButtonText?: string;
    handleSaveCards: () => void;
    companyCards?: boolean;
    jobCoverCardsData?: JobCoverCardFelids;
    showOnlyCover?: boolean;
};
