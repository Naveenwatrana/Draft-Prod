import { IconProps } from './types';

const SearchDark = ({ color = '#373742', size = 30, ...props }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="13.3648" cy="13.5" r="6.34455" transform="rotate(-45 13.3648 13.5)" stroke={color} strokeWidth="2" />
      <path d="M18.3108 17.9512L22.7623 22.4026" stroke={color} strokeWidth="2" />
    </svg>

  );
};

export default SearchDark;
