import { Control, ErrorOption } from 'react-hook-form';

export type AddImageProps = {
  imagePreview: React.Dispatch<React.SetStateAction<string>>;
  setMantra: React.Dispatch<React.SetStateAction<string>>;
  nextStep: () => void;
};

export type IAddImageFormValues = {
  mantra: string;
  image: File[];
};

export type ImageInputProps = {
  control: Control<any>; // TODO: For reusability
  error?: ErrorOption;
  imagePreview: React.Dispatch<React.SetStateAction<string>>;
  setValue: any;
  trigger: (name: 'image') => Promise<boolean>;
  labelText?: string;
  editPictureName?:string
};
