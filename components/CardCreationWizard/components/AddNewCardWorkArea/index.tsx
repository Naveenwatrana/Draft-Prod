import {
  CardTypeOption, Container, Description, Title,
} from './styles';
import { AddNewCardWorkAreaProps } from './types';

const AddNewCardWorkArea = ({ cardData, addNewCard }: AddNewCardWorkAreaProps) => {
  return (
    <Container>
      {cardData && cardData?.map((card) => (
        <CardTypeOption data-cy={`addNewCard${card.type}`} key={card.id} role="button" aria-pressed="false" tabIndex={0} onClick={() => addNewCard(card)}>
          {card.icon}
          <Title>{card.title}</Title>
          <Description>{card.description}</Description>
        </CardTypeOption>
      ))}
    </Container>
  );
};

export default AddNewCardWorkArea;
