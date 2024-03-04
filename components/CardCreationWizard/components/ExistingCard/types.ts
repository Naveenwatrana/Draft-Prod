import { Card } from 'components/CardCreationWizard/types';
import { CardSizes } from 'components/DefaultCard/types';
import { JobCoverCardFelids } from 'pages/jobs/create/types';

export type ExistingCardProps = {
    active: boolean;
    onClick: () => void;
    data: Card;
    size?: CardSizes;
    dataCy: string;
    jobCoverCardsData?: JobCoverCardFelids;
};
