import { SVGProps } from 'react';

const NotificationStackIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      width="17"
      height="12"
      viewBox="0 0 17 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="7" height="12" rx="2" fill="#D9D9D9" />
      <rect x="10" width="7" height="12" rx="2" fill="#D9D9D9" />
    </svg>
  );
};

export default NotificationStackIcon;
