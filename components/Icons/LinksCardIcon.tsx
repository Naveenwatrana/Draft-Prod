import { theme } from 'common/theme';
import { IconProps } from './types';

const ListCardIcon = ({
  color = '#f7f7f7', size = 40, active,
}: IconProps) => {
  const iconColor = active ? theme.palette.green['100'].value : color;
  return (
    <svg width={size} height={size + 1} viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.6935 28.0337L15.5047 33.101C14.5869 33.9968 13.3424 34.5 12.0448 34.5C10.7473 34.5 9.50279 33.9968 8.58502 33.101L7.43236 31.9753C6.51523 31.0794 6 29.8645 6 28.5977C6 27.3309 6.51523 26.1159 7.43236 25.2201L14.9277 17.899C15.8455 17.0032 17.0899 16.5 18.3875 16.5C19.6851 16.5 20.9296 17.0032 21.8473 17.899L23 19.0259" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.3065 12.9659L24.4953 7.89996C24.9496 7.45614 25.489 7.10406 26.0826 6.86385C26.6763 6.62364 27.3126 6.5 27.9552 6.5C28.5978 6.5 29.234 6.62364 29.8277 6.86385C30.4213 7.10406 30.9607 7.45614 31.415 7.89996L32.5676 9.02439C33.4848 9.92021 34 11.1351 34 12.4018C34 13.6686 33.4848 14.8835 32.5676 15.7793L25.0723 23.1C24.618 23.5439 24.0787 23.8959 23.485 24.1362C22.8914 24.3764 22.2551 24.5 21.6125 24.5C20.9699 24.5 20.3336 24.3764 19.7399 24.1362C19.1463 23.8959 18.6069 23.5439 18.1527 23.1L17 21.9732" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
};

export default ListCardIcon;
