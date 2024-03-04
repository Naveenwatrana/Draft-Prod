import { IconProps } from './types';

const EllipseIcon = ({ color = '#5FF088', variant, ...rest }: IconProps) => {
  if (variant === 'small') {
    return (
      <svg
        width="5"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="2.25005" cy="2.89922" r="1.95" fill={color} />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...rest}
    >
      <circle cx="6" cy="6" r="6" fill={color} />
    </svg>
  );
};

export default EllipseIcon;
