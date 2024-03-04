import React from 'react';

const ArrowDown = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 14.5L6 9.5L18 9.5L12 14.5Z" fill="#F7F7F7" />
    </svg>
  );
};

export default ArrowDown;
