import { ReactNode } from 'react';

export type CardModalProps = {
    title: string;
    onClose: () => void;
    description: string;
    children: ReactNode;
    cancel: () => void;
    nextButton: () => void;
    nextButtonText?: string;
};

export type ActionButtonsProps = {
    isFormValid: boolean;
    onClose: () => void;
    onCancel: () => void;
    nextButton: () => void;
    nextButtonText?: string;
};
