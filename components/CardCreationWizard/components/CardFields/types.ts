import { Card } from 'components/CardCreationWizard/types';
import { JobCoverCardFelids } from 'pages/jobs/create/types';

export type CardFieldsProps = {
    selectedCard: Card;
    companyCards?: boolean;
    jobCoverCardsData?: JobCoverCardFelids;
    handleEditImage?: (value: boolean) => void;
};
export type CoverCardFieldsProps = {
    selectedCard: Card;
    withMedia?: boolean;
    withLogo?: boolean;
    jobCoverCardsData?: JobCoverCardFelids;
    handleEditImage?: (value: boolean) => void;
};
export type DeleteButtonElementProps = {
    deleteCard: () => void;
    text: string;
    className?: string;
};

export type AddLinkButtonProps = {
    addLink: () => void;
};
