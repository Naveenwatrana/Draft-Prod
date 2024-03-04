import { useWindowDimensions } from 'common/hooks';
import { useMemo } from 'react';
import AddNewCard from '../AddNewCard';
import ExistingCard from '../ExistingCard';
import { Container } from './styles';
import { CardNavigatorProps } from './types';

const CardNavigator = ({
  onAddNewCard, cards, selectCard, isAddCardEnabled, selectedCard, listView, size, maxCards, jobCoverCardsData, showOnlyCover = true,
}: CardNavigatorProps) => {
  const { isDesktopView } = useWindowDimensions();
  const cardWidth = isDesktopView ? '121px' : '300px';
  const totalCards = maxCards || 1;
  const cardsToRender = useMemo(() => {
    return showOnlyCover ? cards : cards.slice(0, 1);
  }, [cards, showOnlyCover]);
  return (
    <Container width={cardWidth} cardsCount={totalCards} listView={listView}>
      {cardsToRender?.map((card, index) => (
        <ExistingCard
          active={selectedCard.id === card.id}
          onClick={() => selectCard(card)}
          key={card.id}
          data={card}
          size={size}
          dataCy={`userCard${card.type}${index}`}
          jobCoverCardsData={jobCoverCardsData}
        />
      ))}
      {showOnlyCover && maxCards && cards.length < maxCards && <AddNewCard active={isAddCardEnabled} onClick={onAddNewCard} />}
    </Container>
  );
};

export default CardNavigator;
