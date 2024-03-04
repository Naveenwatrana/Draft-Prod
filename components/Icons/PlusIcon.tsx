import { theme } from 'common/theme';
import { IconProps } from './types';

const PlusIcon = ({
  color = '#f7f7f7', size = 25, active, variant, ...rest
}: IconProps) => {
  const iconColor = active ? theme.palette.green['100'].value : color;
  return variant === 'small' ? (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...rest}>
      <path d="M8 2L8 14" stroke={iconColor} />
      <path d="M2 8C6.68629 8 9.31371 8 14 8" stroke={iconColor} />
    </svg>
  )
    : (
      <svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...rest}>
        <path d="M12.5 2.90039V22.1004" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.1004 12.5H2.90039" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
};

export default PlusIcon;
