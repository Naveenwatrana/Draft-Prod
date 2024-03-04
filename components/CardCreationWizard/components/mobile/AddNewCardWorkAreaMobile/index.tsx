import CancelIcon from 'components/Icons/CrossIcon';
import lang from 'common/lang';
import {
  CancelButton,
  CardTypeOption, Container, Description, PageTitle, Title,
} from './styles';
import { AddNewCardWorkAreaProps } from './types';

const { chooseCardType } = lang.cardCreationWizard;

const AddNewCardWorkAreaMobile = ({ cardData, addNewCard, onCancel }: AddNewCardWorkAreaProps) => {
  return (
    <Container>
      <CancelButton onClick={onCancel}><CancelIcon /></CancelButton>
      <PageTitle>{chooseCardType}</PageTitle>
      {cardData && cardData?.map((card) => (
        <CardTypeOption
          key={card.id}
          role="button"
          aria-pressed="false"
          tabIndex={0}
          onClick={() => addNewCard(card)}
        >
          {card.icon}
          <Title>{card.title}</Title>
          <Description>{card.description}</Description>
        </CardTypeOption>
      ))}
    </Container>
  );
};

export default AddNewCardWorkAreaMobile;
