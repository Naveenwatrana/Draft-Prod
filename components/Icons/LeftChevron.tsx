import { theme } from 'common/theme';

const { palette: { white } } = theme;

type Props = {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
};

const ChevronLeft = ({
  color = white[100].value,
  width = '9px',
  height = '16px',
  className,
  onClick,
  ...rest
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      {...rest}
    >
      <path d="M8 1L1 8L8 15" stroke={color} strokeWidth="1.63351" />
    </svg>
  );
};

export default ChevronLeft;
