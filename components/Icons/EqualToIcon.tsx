import React, { SVGProps } from 'react';
import { IconProps } from './types';

const EqualToIcon = (props: IconProps & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 7"
      fill="none"
      {...props}
    >
      <line x1="0.5" y1="0.5" x2="21.5" y2="0.5" stroke="#38393A" />
      <line x1="0.5" y1="6.5" x2="21.5" y2="6.5" stroke="#38393A" />
    </svg>
  );
};

export default EqualToIcon;
