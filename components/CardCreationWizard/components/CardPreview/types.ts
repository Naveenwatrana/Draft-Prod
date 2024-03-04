import { Card } from 'components/CardCreationWizard/types';
import { JobCoverCardFelids } from 'pages/jobs/create/types';

export type CardPreviewProps = {
    selectedCard: Card;
    handleEditImage?: (value: boolean) => void;
    jobCoverCardsData?: JobCoverCardFelids;
};
