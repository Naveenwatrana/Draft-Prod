import { Button } from './styles';
import { BorderedButtonProps } from './types';

const BorderedButton = ({
  label, primary, onClick, ...rest
}: BorderedButtonProps) => {
  return <Button label={label} primary={primary} onClick={onClick} {...rest} />;
};

export default BorderedButton;
