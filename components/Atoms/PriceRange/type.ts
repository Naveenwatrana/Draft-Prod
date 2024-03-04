import { FieldError } from 'react-hook-form';

export type PriceRangeProps = {
  range: [number, number];
  dataCys: [string, string];
  onRangeChange: (range: [number, number]) => void;
  error?: FieldError;
  maxDigits?: number;
};

export type PriceInputProps = {
  maxDigits?: number;
  id: string,
  error?: FieldError,
  label: string,
  placeholder?: string;
  value: number;
  onChange: (input: number) => void;
};

export type ContainerProps = {
  error?: boolean;
};
