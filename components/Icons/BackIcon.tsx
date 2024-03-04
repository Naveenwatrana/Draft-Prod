import React from 'react';

const BackIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.7227 23.445L15.2776 18L20.7227 12.555"
        stroke="white"
        strokeWidth="1.63351"
      />
      <rect
        x="35.5"
        y="35.5"
        width="35"
        height="35"
        rx="17.5"
        transform="rotate(-180 35.5 35.5)"
        stroke="#38393A"
      />
    </svg>
  );
};

export default BackIcon;
