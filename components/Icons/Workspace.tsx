type Props = {
  color?: string;
};

export const Workspace = ({ color = '#F7F7F7' }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4150_35550)">
        <path
          d="M11 1.71072L13.3366 6.86366L13.4539 7.12243L13.7363 7.15406L19.3591 7.78396L15.1804 11.5986L14.9706 11.7901L15.0277 12.0684L16.1662 17.6107L11.247 14.8153L11 14.6749L10.753 14.8153L5.83379 17.6107L6.97226 12.0684L7.02943 11.7901L6.81958 11.5986L2.6409 7.78396L8.26369 7.15406L8.54605 7.12243L8.66339 6.86366L11 1.71072Z"
          stroke={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_4150_35550">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
