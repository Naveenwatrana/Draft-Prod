import PlusIcon from 'components/Icons/PlusIcon';
import lang from 'common/lang';
import { useWindowDimensions } from 'common/hooks';
import { AddCardText, Button, Container } from './styles';
import { AddCardProps } from './types';

const { cardCreationWizard: { addCard } } = lang;

const AddNewCard = ({ active, onClick }: AddCardProps) => {
  const { isDesktopView } = useWindowDimensions();
  const cardWidth = isDesktopView ? 'calc(100% - 44px)' : '258px';
  const cardHeight = isDesktopView ? 'calc(195px - 124px)' : '70vh';
  return (
    <Button type="button" onClick={onClick} disabled={!active} data-testid="AddNewCardButton" data-cy="AddNewCardButton">
      <Container width={cardWidth} height={cardHeight} active={active} data-testid="AddNewCardContainer" data-cy="AddNewCardContainer">
        <PlusIcon active={active} />
        <AddCardText active={active}>{addCard}</AddCardText>
      </Container>
    </Button>

  );
};

export default AddNewCard;
