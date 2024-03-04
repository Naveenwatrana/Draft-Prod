type Props = {
  color?: string;
};

const UploadIcon = ({ color = '#6A7D8E' }: Props) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5005 29.1951V10.804M20.5005 10.804L13.6038 17.7006M20.5005 10.804L27.3972 17.7006M38.8916 19.9995C38.8916 30.1566 30.6576 38.3906 20.5005 38.3906C10.3434 38.3906 2.10938 30.1566 2.10938 19.9995C2.10938 9.84238 10.3434 1.6084 20.5005 1.6084C30.6576 1.6084 38.8916 9.84238 38.8916 19.9995Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UploadIcon;
