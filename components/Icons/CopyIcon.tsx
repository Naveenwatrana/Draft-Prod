import React from 'react';
import { IconProps } from './types';

const CopyIcon = ({ color = '#5FF088', ...rest }: IconProps) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.85303 14.6471C5.31559 15.4554 6.18636 16 7.18434 16H12.8159C14.2984 16 15.5001 14.7982 15.5001 13.3158V3.68421C15.5001 2.20176 14.2984 1 12.8159 1H11.8159C13.2983 1 14.5001 2.20176 14.5001 3.68421V12.3158C14.5001 13.7982 13.2983 15 11.8159 15H6.18432C5.69986 15 5.24539 14.8717 4.85303 14.6471Z"
        fill={color}
      />
      <rect
        x="2.25"
        y="0.75"
        width="10.5"
        height="12.5"
        rx="1.93421"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default CopyIcon;
