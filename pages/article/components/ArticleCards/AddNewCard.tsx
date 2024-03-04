import { AddCardProps } from 'components/CardCreationWizard/components/AddNewCard/types';
import PlusIcon from 'components/Icons/PlusIcon';
import lang from 'common/lang';
import { AddCardText, Button, Container } from './styles';

const { cardCreationWizard: { addCard } } = lang;

const AddNewCard = ({ active, onClick }: AddCardProps) => {
  return (
    <Button type="button" onClick={onClick} disabled={!active} data-testid="AddNewCardButton" data-cy="AddNewCardButton">
      <Container
        width="205px"
        height="346px"
        active={active}
        data-testid="AddNewCardContainer"
        data-cy="AddNewCardContainer"
      >
        <PlusIcon active={active} />
        <AddCardText active={active}>{addCard}</AddCardText>
      </Container>
    </Button>
  );
};

export default AddNewCard;
