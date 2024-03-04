import {
  Control, FieldError, UseFormSetValue, UseFormTrigger,
} from 'react-hook-form';
import { IAddImageFormValues } from 'pages/pro/basicDetails/mobile/EditImageDetail/types';

export type AddImageProps = {
  fullName: string;
  control: Control<IAddImageFormValues>;
  error?: FieldError;
  setValue: UseFormSetValue<IAddImageFormValues>;
  trigger: UseFormTrigger<IAddImageFormValues>;
  editPicture: string;
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
  editPictureName: string;
  setEditPictureName: React.Dispatch<React.SetStateAction<string>>;
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
  removePicture: () => void;
};

export type EditImageProps = {
  fullName: string;
  mantra: string;
  labelText: string;
  labelBrowse: string;
  info: string;
  error?: FieldError
  id: string;
  type: string;
  control: Control<IAddImageFormValues>;
  setValue: UseFormSetValue<IAddImageFormValues>;
  trigger: UseFormTrigger<IAddImageFormValues>;
  editPictureImgUrl: string;
  editPicture: string;
  setEditPictureImgUrl: React.Dispatch<React.SetStateAction<string>>;
  editPictureName: string;
  setEditPictureName: React.Dispatch<React.SetStateAction<string>>;
  isImageErr?: boolean;
}
