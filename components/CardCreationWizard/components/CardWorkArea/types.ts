import { Card } from 'components/CardCreationWizard/types';
import { JobCoverCardFelids } from 'pages/jobs/create/types';

export type CardWorkAreProps = {
    selectedCard: Card;
    companyCards?: boolean;
    jobCoverCardsData?: JobCoverCardFelids;
};
export type MediaFile = {
    file: File;
    id: string;
}
