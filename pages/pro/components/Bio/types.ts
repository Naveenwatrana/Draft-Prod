import { ChangeEvent } from 'react';

export type EditBioProps = {
    bio: string;
    updateText: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    characterLength: number;
    cancel: () => void;
    saveBio: () => void;
    disabledButton: boolean;
    error: boolean;
};
