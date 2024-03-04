type Props = {
  color?: string;
};

const LoadingIcon = ({ color = '#6A7D8E' }: Props) => {
  return (
    <svg
      width="5"
      height="5"
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.80322 0.966553L4.15989 3.32322"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LoadingIcon;
