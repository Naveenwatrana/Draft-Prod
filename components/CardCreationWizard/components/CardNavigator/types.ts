import { Card } from 'components/CardCreationWizard/types';
import { CardSizes } from 'components/DefaultCard/types';
import { JobCoverCardFelids } from 'pages/jobs/create/types';

export type CardNavigatorProps = {
    onAddNewCard: () => void;
    cards: Card[];
    selectCard: (card: Card) => void;
    isAddCardEnabled: boolean;
    selectedCard: Card;
    listView?: boolean;
    size?: CardSizes;
    maxCards?: number;
    jobCoverCardsData?: JobCoverCardFelids;
    showOnlyCover?: boolean;
};
