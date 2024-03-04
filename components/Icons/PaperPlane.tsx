import { IconProps } from './types';

const PaperPlaneIcon = ({ hasNotification, variant = 'filled' }: IconProps) => {
  return variant === 'filled' ? (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_13407_3296)">
        <path
          d="M27.8237 7.20001L5.42457 16.6649C5.2921 16.7221 5.18024 16.8199 5.10442 16.9449C5.0286 17.0699 4.99256 17.2158 5.00128 17.3626C5.00999 17.5095 5.06302 17.6499 5.15306 17.7646C5.2431 17.8793 5.3657 17.9625 5.50397 18.0029L13.9291 20.3978L27.8237 7.20001Z"
          fill="#F7F7F7"
        />
        <path
          d="M29.0001 8.01215L25.1791 26.5764C25.1485 26.7217 25.0838 26.8573 24.9905 26.9713C24.8971 27.0852 24.778 27.1742 24.6435 27.2304C24.5089 27.2866 24.363 27.3084 24.2183 27.2939C24.0737 27.2793 23.9347 27.2289 23.8134 27.1469L15.1055 21.2099L29.0001 8.01215Z"
          fill="#F7F7F7"
        />
        <path
          d="M12.4969 21.3551V27.9337C12.4972 28.0493 12.5346 28.1617 12.6034 28.2534C12.6722 28.3452 12.7687 28.4112 12.8778 28.4414C12.987 28.4715 13.1028 28.4641 13.2074 28.4202C13.312 28.3763 13.3996 28.2985 13.4567 28.1987L15.9984 23.7419"
          fill="#F7F7F7"
        />
      </g>
      {hasNotification && (
        <circle
          cx="6.07895"
          cy="7"
          r="5.57895"
          fill="#5FF088"
          stroke="#171718"
        />
      )}
      <defs>
        <clipPath id="clip0_13407_3296">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(5 7.20001)"
          />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_13383_4634)">
        <path
          d="M0.659288 9.17798C0.555686 9.11509 0.470837 9.02557 0.413575 8.91875C0.356313 8.81193 0.328731 8.69172 0.3337 8.57062C0.338669 8.44952 0.376008 8.33197 0.441829 8.23021C0.507651 8.12844 0.599548 8.04618 0.707954 7.99198L15.6666 0.333313L12.0486 15.142C12.0222 15.2484 11.9707 15.3469 11.8985 15.4294C11.8262 15.5118 11.7353 15.5758 11.6333 15.616C11.5307 15.657 11.4199 15.6734 11.3098 15.6639C11.1997 15.6544 11.0934 15.6193 10.9993 15.5613L0.659288 9.17798Z"
          stroke="#38393A"
          strokeWidth="0.916667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.654 13.4966L5.584 15.5666C5.53617 15.6145 5.4752 15.6472 5.40881 15.6604C5.34243 15.6736 5.27361 15.6668 5.21108 15.6409C5.14854 15.615 5.0951 15.5711 5.05753 15.5148C5.01995 15.4585 4.99993 15.3923 5 15.3246V11.858L15.6667 0.333313"
          stroke="#38393A"
          strokeWidth="0.916667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_13383_4634">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PaperPlaneIcon;
