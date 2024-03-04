import {
  Control, FieldError, UseFormSetValue, UseFormTrigger,
} from 'react-hook-form';
import { IAddImageFormValues } from 'pages/pro/onboarding/mobile/addImage/types';

export type AddImageProps = {
  fullName: string;
  control: Control<IAddImageFormValues>;
  error?: FieldError;
  setValue: UseFormSetValue<IAddImageFormValues>;
  trigger: UseFormTrigger<IAddImageFormValues>;
};

export type IImageInputProps = {
  labelText: string;
  labelBrowse: string;
  info: string;
  error?: string;
  id: string;
  type: string;
  control: Control<IAddImageFormValues>;
};

export type UploadContentProps = {
  labelText: string;
  labelBrowse:string
  info: string;
}

export type UploadContainerProps = {
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
  children: React.ReactNode;
}

export type ImageTitleProps = {
  fileName: string;
  removePicture: () => void;
}

export type ImagePreviewProps = {
  picture: string;
}

export type ImageInputProps = {
  labelText: string;
  labelBrowse: string;
  info: string;
  error?: FieldError
  id: string;
  type: string;
  control: Control<IAddImageFormValues>;
  setValue: UseFormSetValue<IAddImageFormValues>;
  trigger: UseFormTrigger<IAddImageFormValues>;
  setPicture: (picture: string) => void;
  setFileName: (fileName: string) => void;
};
