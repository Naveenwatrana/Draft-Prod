import { ButtonHTMLAttributes, ReactElement } from 'react';

export type ButtonType = 'button' | 'submit';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = StyledButtonProps & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  primary?: boolean;
  backgroundColor?: string;
  label: string | ReactElement;
  type?: ButtonType;
  css?: string;
  variant?: string;
  className?: string;
  error?: boolean;
};

export type StyledButtonProps = {
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
};

export type ButtonFixedProps = {
  width?: string;
};
