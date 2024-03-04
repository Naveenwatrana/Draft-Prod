import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import { DeleteButton } from './styles';
import { DeleteButtonElementProps } from './types';

const DeleteButtonElement = ({ deleteCard, text, className }: DeleteButtonElementProps) => {
  return (

    <DeleteButton onClick={deleteCard} className={className}>
      <TrashIcon color={theme.palette.red[100].value} />
      <p>{text}</p>
    </DeleteButton>
  );
};

export default DeleteButtonElement;
