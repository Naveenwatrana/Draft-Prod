import { ChangeEvent, InputHTMLAttributes } from 'react';
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

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  labelText: string;
  info?: string;
  id: string;
  error?: FieldError;
  type: InputType;
  placeholder?: string;
  uploadIcon?: boolean;
  register?: any; // UseFormRegister<ISignupFormValues>;
}

export type CheckboxProps = {
  register: UseFormRegister<any>,
  id: string,
  error?: FieldError,
  label: string,
};

export type SimpleInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  labelText?: string;
  info?: string;
  id: string;
  error?: any;
  type: InputType;
  placeholder?: string;
  uploadIcon?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
