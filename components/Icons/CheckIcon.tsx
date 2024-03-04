import React from 'react';

type Props = {
  color?: string;
  size?: number;
  variant?: string;
};

export const CheckIcon = ({
  color = '#7E8D9A', size = 20, variant, ...rest
}: Props) => {
  if (variant === 'small') {
    return (
      <svg width="16" height="13" viewBox="0 0 16 13" fill="none" {...rest}>
        <path d="M1 7.2069L4.85 11L15 1" stroke="white" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg width={size * 1.23} height={size} viewBox="0 0 16 13" fill="none" {...rest}>
      <path d="M1 7.2069L4.85 11L15 1" stroke={color} strokeWidth="2" />
    </svg>
  );
};

export default CheckIcon;
