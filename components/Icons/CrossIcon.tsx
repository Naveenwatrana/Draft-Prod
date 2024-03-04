import React from 'react';
import { IconProps } from './types';

export const CancelIcon = ({
  color = '#7E8D9A', size = 20, variant = 'medium', ...rest
}: IconProps) => {
  if (variant === 'small') {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" {...rest}>
        <path d="M3.75684 3.75781L12.2421 12.2431" stroke={color} />
        <path
          d="M3.75684 12.2422C7.07054 8.92848 8.92841 7.07061 12.2421 3.75691"
          stroke={color}
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size + 1} viewBox="0 0 12 13" fill="none" {...rest}>
      <path d="M1 11.5L11.15 1.5" stroke={color} strokeWidth="2" />
      <path d="M11.075 11.5752L1.07495 1.4252" stroke={color} strokeWidth="2" />
    </svg>
  );
};

export default CancelIcon;
