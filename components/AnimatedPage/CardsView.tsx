import { useIsMobile } from 'common/hooks/useIsMobile';
import CarouselDesktop from './CarouselDesktop';
import CarouselMobile from './CarouselMobile';
import {
  CarouselContainer,
} from './styles';
import { CardsViewProps } from './types';

const CardsView = ({
  cards, actions, info, maxCardRight, inContentView, inView,
}: CardsViewProps) => {
  const isMobile = useIsMobile();

  return (
    <CarouselContainer inContentView={inContentView}>
      {isMobile && (
        <CarouselMobile cards={cards} info={info} actions={actions} />
      )}
      {!isMobile && (
        <CarouselDesktop
          cards={cards}
          inView={inView || inContentView}
          inContentView={inContentView}
          info={info}
          actions={actions}
          maxCardRight={maxCardRight}
        />
      )}
    </CarouselContainer>
  );
};

export default CardsView;
