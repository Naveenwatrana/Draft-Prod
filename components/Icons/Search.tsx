import { IconProps } from './types';

const Searchicon = ({ color = '#f7f7f7', size = 38, ...rest }: IconProps) => {
  return (
    <svg width={size} height={size + 1} viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g clipPath="url(#clip0_2904_31421)">
        <circle cx="17.569" cy="17" r="10.0089" transform="rotate(-45 17.569 17)" stroke={color} strokeWidth="2" />
        <path d="M24.9824 23.6719L31.6548 30.3443" stroke={color} strokeWidth="2" />
      </g>
      <defs>
        <clipPath id="clip0_2904_31421">
          <rect width={size} height={size} fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Searchicon;
