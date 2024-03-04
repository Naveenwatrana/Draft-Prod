import PlusIcon from 'components/Icons/PlusIcon';
import { theme } from 'common/theme';
import lang from 'common/lang';
import { AddLinkButton } from './styles';
import { AddLinkButtonProps } from './types';

const { addAnotherLink } = lang.cardCreationWizard.linkCard;

const AddLinkButtonElement = ({ addLink }: AddLinkButtonProps) => {
  return (

    <AddLinkButton onClick={addLink}>
      <PlusIcon size={16} color={theme.palette.green[100].value} />
      <p>{addAnotherLink}</p>
    </AddLinkButton>
  );
};

export default AddLinkButtonElement;
