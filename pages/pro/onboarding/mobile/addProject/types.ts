import {
  Control, FieldErrorsImpl, UseFormRegister, UseFormWatch,
} from 'react-hook-form';

export type AddProjectProps = {
  fullName: string;
  nextStep: () => void;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
};

export type IAddProjectFormValues = {
  title: string;
  role: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
};

export type IWatchProjectValues = {
  title: string;
  role: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
};

export type ProjectProps = {
  showPreview : () => void;
  handleSkip : () => void;
  setTitle : (title: string) => void;
  setSubtitle : (subtitle: string) => void;
  register : UseFormRegister<IAddProjectFormValues>;
  errors : Partial<FieldErrorsImpl<IAddProjectFormValues>>;
  watch : UseFormWatch<IAddProjectFormValues>;
  control : Control<IAddProjectFormValues>;
}
