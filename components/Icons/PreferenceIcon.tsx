import React from 'react';
import { theme } from 'common/theme';
import { IconProps } from './types';

const PreferenceIcon = ({ color = theme.palette.white[100].value }:IconProps) => {
  return (
    <svg
      width="17"
      height="10"
      viewBox="0 0 17 10"
      fill="none"
    >
      <g clip-path="url(#clip0_18_2781)">
        <path
          d="M6.90272 7.55551C6.90272 7.8944 6.7681 8.21941 6.52847 8.45904C6.28884 8.69867 5.96383 8.83329 5.62495 8.83329C5.28606 8.83329 4.96105 8.69867 4.72142 8.45904C4.48179 8.21941 4.34717 7.8944 4.34717 7.55551V2.4444C4.34717 2.10552 4.48179 1.78051 4.72142 1.54088C4.96105 1.30125 5.28606 1.16663 5.62495 1.16663C5.96383 1.16663 6.28884 1.30125 6.52847 1.54088C6.7681 1.78051 6.90272 2.10552 6.90272 2.4444V7.55551Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.18054 5.00061H15.8472"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.15283 5.00061H3.0695"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_18_2781">
          <rect
            width="16"
            height="10"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PreferenceIcon;
