import { useEffect, useState } from 'react';
import { CarouselDesktopProps } from '../types';
import CarouselItemsWrap from './CarouselItemsWrap';
import SliderArrow from './SliderArrow';
import { CarouselContainerDesktop, CarouselWrapper } from './styles';

const CarouselDesktop = ({
  cards,
  inView,
  actions,
  maxCardRight,
  inContentView,
}: CarouselDesktopProps) => {
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1);
  useEffect(() => {
    setCurrentIndex(cards.length - 1);
  }, [cards]);
  const reversedCards = [...cards].reverse();
  const handlePrevClick = () => setCurrentIndex((currentIndex + 1) % cards.length);
  const handleNextClick = () => setCurrentIndex((currentIndex - 1 + cards.length) % cards.length);
  const showLeftArrow = currentIndex !== cards.length - 1;
  const showRightArrow = currentIndex !== 0;

  return (
    <CarouselContainerDesktop data-cy="desktopCarouselContainer">
      <SliderArrow
        type="external"
        direction="left"
        show={!inView && showLeftArrow}
        onClick={handlePrevClick}
      />
      <CarouselWrapper
        animate={{ x: inView ? maxCardRight : 0 }}
        inContentView={inContentView}
        transition={inView ? { duration: 0.4, type: 'easeInOut' } : undefined}
      >
        <CarouselItemsWrap
          cards={reversedCards}
          currentIndex={currentIndex}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          showLeftArrow={showLeftArrow}
          showRightArrow={showRightArrow}
          inView={inView}
        />
        {actions}
      </CarouselWrapper>
      <SliderArrow
        type="external"
        direction="right"
        show={!inView && showRightArrow}
        onClick={handleNextClick}
      />
    </CarouselContainerDesktop>
  );
};

export default CarouselDesktop;
