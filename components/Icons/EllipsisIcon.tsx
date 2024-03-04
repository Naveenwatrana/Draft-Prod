import React from 'react';
import { IconProps } from './types';

const EllipsisIcon = ({ size = 22, color = '#f7f7f7' }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="5.89282" cy="11" rx="1.375" ry="1.5" fill={color} />
      <ellipse cx="11.6428" cy="11" rx="1.375" ry="1.5" fill={color} />
      <ellipse cx="17.3928" cy="11" rx="1.375" ry="1.5" fill={color} />
    </svg>
  );
};

export default EllipsisIcon;
