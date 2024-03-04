/* eslint-disable react/button-has-type */
import {
  ErrorButton,
  LinkButton, PrimaryButton, PrimaryGradientButton, SecondaryButton,
} from 'components/buttonComp/style';
import { ButtonProps } from 'components/buttonComp/types';

export const ButtonComp = ({
  primary,
  size,
  backgroundColor,
  label,
  type = 'button',
  css,
  fullWidth,
  variant,
  disabled,
  className,
  error,
  ...props
}: ButtonProps) => {
  if (variant === 'link') {
    return (
      <LinkButton
        type={type}
        error={error}
        fullWidth={fullWidth}
        disabled={disabled}
        size={size}
        className={className}
        {...props}
      >
        {label}
      </LinkButton>
    );
  }
  if (variant === 'primary_gradient' && primary) {
    return (
      <PrimaryGradientButton
        type={type}
        fullWidth={fullWidth}
        disabled={disabled}
        size={size}
        className={className}
        {...props}
      >
        {label}
      </PrimaryGradientButton>
    );
  }
  if (error) {
    return (
      <ErrorButton
        type={type}
        fullWidth={fullWidth}
        disabled={disabled}
        size={size}
        className={className}
        {...props}
      >
        {label}
      </ErrorButton>
    );
  }

  return primary ? (
    <PrimaryButton
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      size={size}
      className={className}
      {...props}
    >
      {label}
    </PrimaryButton>
  ) : (
    <SecondaryButton
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      size={size}
      className={className}
      {...props}
    >
      {label}
    </SecondaryButton>
  );
};

export default ButtonComp;
