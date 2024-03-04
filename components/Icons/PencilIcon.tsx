import React from 'react';
import { IconProps } from './types';

const PencilIcon = ({ size = 16, color = '#5FF088' }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.0541 4.53647L11.4629 1.94531L2.27118 11.137L4.86234 13.7282L14.0541 4.53647Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.26999 11.1367L0.974609 15.0235L4.86137 13.7281L2.26999 11.1367Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.0537 4.53689L11.4629 1.94612L11.8947 1.51433C12.2402 1.18057 12.7031 0.995895 13.1835 1.00007C13.6639 1.00424 14.1234 1.19694 14.4631 1.53665C14.8028 1.87636 14.9955 2.3359 14.9997 2.81631C15.0039 3.29671 14.8192 3.75954 14.4855 4.1051L14.0537 4.53689Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default PencilIcon;
