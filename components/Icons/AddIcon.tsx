import { IconProps } from './types';

const AddIcon = ({
  color = '#5FF088', variant, ...rest
}: IconProps) => {
  if (variant === 'small') {
    return (
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.07227 2L8.07227 14" stroke={color} stroke-width="1.5" />
        <path d="M2.07227 8C6.75856 8 9.38597 8 14.0723 8" stroke={color} stroke-width="1.5" />
      </svg>
    );
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...rest}
    >
      <path d="M8 2L8 14" stroke={color} />
      <path d="M2 8C6.68629 8 9.31371 8 14 8" stroke={color} />
    </svg>
  );
};

export default AddIcon;
