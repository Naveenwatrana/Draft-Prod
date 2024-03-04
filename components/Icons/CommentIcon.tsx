import React from 'react';
import { IconProps } from './types';

const CommentIcon = ({ active, size = 20 }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_20009_3205)">
        <path d="M9.54883 15.6045C13.4524 15.6045 16.6169 12.44 16.6169 8.53638C16.6169 4.63276 13.4524 1.46826 9.54883 1.46826C5.64522 1.46826 2.48071 4.63276 2.48071 8.53638C2.48071 8.87539 2.50458 9.20884 2.55073 9.53512C2.68443 10.4804 2.75128 10.9531 2.76088 11.0775C2.77646 11.2797 2.77395 11.2072 2.77238 11.4099C2.77141 11.5347 2.76126 11.6768 2.74096 11.961L2.62017 13.6521C2.57207 14.3255 2.54802 14.6622 2.66739 14.914C2.77218 15.135 2.95017 15.313 3.1712 15.4178C3.42299 15.5372 3.75969 15.5131 4.43306 15.465L6.12417 15.3442C6.40827 15.324 6.55051 15.3138 6.67528 15.3128C6.87802 15.3113 6.80554 15.3087 7.00767 15.3243C7.1321 15.3339 7.60478 15.4008 8.55009 15.5345C8.87637 15.5806 9.20981 15.6045 9.54883 15.6045Z" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_20009_3205">
          <rect width="16" height="16" fill="white" transform="translate(0.899658)" />
        </clipPath>
      </defs>
    </svg>

  );
};

export default CommentIcon;
