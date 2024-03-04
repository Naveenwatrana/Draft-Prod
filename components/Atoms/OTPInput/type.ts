import { FieldError } from 'react-hook-form';

export type OTPInputProps = {
  value: string;
  onChange: (otp: string) => void;
  error?: FieldError;
  numInputs?: number;
  placeholder?: string;
};

export type InputProps = {
  error?: boolean;
};
