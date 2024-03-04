import { FieldErrorsImpl, UseFormRegister, UseFormWatch } from 'react-hook-form';

export type IAddBioFormValues = {
    bio: string;
  };

export type AddBioProps = {
  fullName: string;
  nextStep : () => void;
  setTitle : (title: string) => void;
  setSubtitle : (subtitle: string) => void;
}

export type BioProps = {
  showPreview : () => void;
  handleSkip : () => void;
  setTitle : (title: string) => void;
  setSubtitle : (subtitle: string) => void;
  register : UseFormRegister<IAddBioFormValues>;
  errors : Partial<FieldErrorsImpl<IAddBioFormValues>>;
  watch : UseFormWatch<IAddBioFormValues>;
}
