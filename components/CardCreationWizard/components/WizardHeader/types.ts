import { ReactElement } from 'react';

export type WizardHeaderProps = {
    title: ReactElement;
    onClose?: () => void;
};
