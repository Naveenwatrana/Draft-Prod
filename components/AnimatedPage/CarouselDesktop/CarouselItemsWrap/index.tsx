import {
  CarouselItemsWrapProps,
  IHandleMouseEnter,
  IHandleMouseLeave,
} from 'components/AnimatedPage/types';
import { useState } from 'react';
import Carousel from '../Carousel';
import SliderArrow from '../SliderArrow';
import { CarouselItemsWrapper } from './styles';

const CarouselItemsWrap = ({
  cards,
  currentIndex,
  inView,
  showLeftArrow,
  showRightArrow,
  handlePrevClick,
  handleNextClick,
}: CarouselItemsWrapProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseEnter: IHandleMouseEnter = (event) => {
    setIsHovering(true);
  };

  const handleMouseLeave: IHandleMouseLeave = (event) => {
    setIsHovering(false);
  };

  return (
    <CarouselItemsWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cy="desktopCarouselItemWrapper"
    >
      <SliderArrow
        type="internal"
        direction="left"
        show={inView && isHovering && showLeftArrow}
        onClick={handlePrevClick}
      />
      <Carousel
        cards={cards}
        currentIndex={currentIndex}
        inView={inView}
        showLeftCard={showLeftArrow}
        showRightCard={showRightArrow}
      />
      <SliderArrow
        type="internal"
        direction="right"
        show={inView && isHovering && showRightArrow}
        onClick={handleNextClick}
      />
    </CarouselItemsWrapper>
  );
};

export default CarouselItemsWrap;
