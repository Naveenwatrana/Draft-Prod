import {
  Control, FieldErrorsImpl, UseFormRegister,
} from 'react-hook-form/dist/types';

export type INameFormValues = {
  firstName: string;
  lastName: string;
};

export type IPictureFormValues = {
  picture: File;
};

export type IProfileFormValues = {
  firstName: string;
  lastName: string;
  picture?: File;
};

export type INameFormProps = {
  nextFormStep: () => void;
};

export type IPictureFormProps = {
  prevFormStep: () => void;
  nextFormStep: () => void;
};

export type IAddImageProps = {
  fullName: string;
  control: Control<IProfileFormValues>;
  errors: Partial<FieldErrorsImpl<IFields>>;
  previousFormStep: () => void;
}

export type IFields = {
  firstName: string;
  lastName: string;
  picture: File;
};

export type IAddNameProps = {
  register: UseFormRegister<INameFormValues>;
  errors?: Partial<FieldErrorsImpl<IFields>>;
  nextFormStep: () => void;
}

export type FormHeaderProps = {
  totalSteps: number;
  currentStep: number;
  title: string;
  subtitle: string;
}

export type IStepConfig = {
  content: JSX.Element;
}
