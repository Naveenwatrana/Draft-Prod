import { InputType } from 'components/input/types';
import { JobCoverCardFelids } from 'pages/jobs/create/types';
import { ReactNode } from 'react';

export type CardField = {
    id: number;
    label: string;
    type: InputType;
    placeholder?: string;
    height?: number;
    maxCharacters?: number;
};
export type IFieldValue = { [key: string]: string | any[] | undefined | boolean }; // FIXME: Type
export type Card = {
    type: CardTypes;
    id: string;
    fields?: CardField[];
    meta: string;
    description?: string;
    fieldValues?: IFieldValue;
    isValid?: boolean;
};

export type CardType = {
    id: number;
    title: string;
    description: string;
    icon: ReactNode;
    type: CardTypes;
    fields: CardField[];
    meta: string;
    fieldValues?: { [key: string]: string | any[] | undefined };
};

export type CardCreationWizardProps = {
    onClose: () => void;
    onSave: () => void;
    maxCards: number;
    activeCardId: number;
    cardData: CardType[];
    title: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    addCardStep?: boolean;
    companyCards?: boolean;
    jobCoverCardsData?: JobCoverCardFelids;
    showOnlyCover?: boolean;
};
export enum CardCreationState {
  AddNewCard = 'AddNewCard',
  EditCard = 'EditCard',
  previewCard = 'previewCard',
}

export enum CardTypes {
    Link = 'Link',
    About = 'About',
    Cover = 'Cover',
}
export type CardCreationWizardMobileProps = {
    cardData: CardType[];
    maxCards?: number;
    title: string;
    onClose: () => void;
    saveButtonText?: string;
    onSave: () => void;
    companyCards?: boolean;
    jobCoverCardsData?: JobCoverCardFelids;
};
export enum CardSteps {
    initial = 1,
    coverCardMedia = 2,
    coverCardPreview = 3,
    cardFields = 4,
    cardPreviewComplete = 5,
}
export enum ImageFields {
    croppedImage = 'croppedImage',
    fileType = 'fileType',
    localVideo = 'localVideo',
    media = 'media',
}
