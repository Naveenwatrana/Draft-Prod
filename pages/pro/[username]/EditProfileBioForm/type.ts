import { MyOptionType } from 'components/Select/types';
import { IImage } from 'components/ImageUpload/types';
import { ICard } from 'pages/feed/types';
import React from 'react';

export type IEditBioFormProps = {
    validated: boolean,
    closeForm: () => void,
    setIsCropImgModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleUploadFileCallback: (file:File | string) => void;
    cropImageFile: any;
    setSkip: () => void;
}

export type IEditBioFormFields = {
    media: string;
    firstName: string;
    lastName: string;
    location: MyOptionType | null;
    mantra: string;
  };

export type IEditProfileBioFormFields = {
    media: IImage | null | undefined | string;
    firstName: string;
    lastName: string;
    location: MyOptionType | null;
    mantra: string;
    cards: ICard[];
};

export type ICropProfileImageFields = {
    uploadedFile: string;
    uploadCropImage?: any;
    closeForm: () => void;
}
