import { MyOptionType } from 'components/Select/types';
import React from 'react';
import { Control, ErrorOption } from 'react-hook-form';

export type EditFullNameProps = {
    firstName: string;
    lastName: string;
    location?: MyOptionType;
    setEditFullNameDetail: React.Dispatch<React.SetStateAction<boolean>>;
    editFullNameDetail: boolean;
}

export type EditImageProps = {
    firstName: string;
    lastName: string;
    picture: string;
    pictureName: string;
    setEditImageDetail: React.Dispatch<React.SetStateAction<boolean>>;
    mantra: string;
    userProfileCover?:string;
    editImageDetail: boolean;
}

export type IAddImageFormValues = {
    image: File | string;
    mantra: string;
}

export type ImageInputProps = {
    control: Control<any>; // TODO: For reusability
    error?: ErrorOption;
    imagePreview: React.Dispatch<React.SetStateAction<string>>;
    setValue: any;
    trigger: (name: 'image') => Promise<boolean>;
    labelText?: string;
    editPictureName: string,
    setEditPictureName: React.Dispatch<React.SetStateAction<string>>;
  };

export type BasicDetailsMobileProps = {
    openWizard: boolean;
    setOpenWizard: (state: boolean) => void;
    addCardStep?: boolean;
    data: any;
};
