import { Button } from './styles';
import { IconButtonProps } from './types';

const IconButton = ({ children, onClick, active }: IconButtonProps) => {
  return (
    <Button active={active} type="button" onClick={onClick} disabled={false}>{children}</Button>
  );
};

export default IconButton;
