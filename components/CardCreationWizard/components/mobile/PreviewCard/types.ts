import { Card } from 'components/CardCreationWizard/types';

export type PreviewCardProps = {
    active: boolean;
    onClick: () => void;
    data: Card;
    nextButton: () => void;
    onClose: () => void;
    onCancel: () => void;
    title: string;
    description: string;
    nextButtonText?: string;
};
