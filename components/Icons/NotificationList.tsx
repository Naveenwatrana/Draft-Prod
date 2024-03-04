import { SVGProps } from 'react';

const NotificationListIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        y="11.25"
        width="1.5"
        height="18"
        rx="0.75"
        transform="rotate(-90 0 11.25)"
        fill="#D9D9D9"
      />
      <rect
        y="6.75"
        width="1.5"
        height="18"
        rx="0.75"
        transform="rotate(-90 0 6.75)"
        fill="#D9D9D9"
      />
      <rect
        y="2.25"
        width="1.5"
        height="18"
        rx="0.75"
        transform="rotate(-90 0 2.25)"
        fill="#D9D9D9"
      />
    </svg>
  );
};

export default NotificationListIcon;
