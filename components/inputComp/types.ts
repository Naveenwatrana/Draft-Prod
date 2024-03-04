import { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

export enum InputType {
  TEXT = 'TEXT',
  TEXTAREA = 'textarea',
  CHECKBOX = 'CHECKBOX',
  PASSWORD = 'password',
  EMAIL = 'email',
  FILE = 'file',
  DATE = 'date',
  NUMBER = 'number',
  MEDIA = 'media',
}

type CommonInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  labelText: string;
  info?: string;
  id: string;
  error?: FieldError;
  dynamicErrorContent?: ReactElement;
  type: InputType;
  textArea?: boolean;
  large?: boolean;
  placeholder?: string;
  uploadIcon?: boolean;
}

export type InputProps = CommonInputProps & {
  register?: any; // UseFormRegister<ISignupFormValues>;
}

export type SimpleInputProps = CommonInputProps & {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type CheckboxProps = {
  register: UseFormRegister<any>,
  id: string,
  error?: FieldError,
  label: string,
};

export type InputWordCountProps = {
  value: string;
  setValue: (e: string) => void;
  maxCharacters: number;
  minCharacters?: number;
  placeholder?: string,
  label?: string,
  type?: InputType,
};
