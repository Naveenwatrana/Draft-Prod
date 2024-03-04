import { ArrowIcon, CarouselArrow } from './styles';
import { CardStackArrowsProps } from './types';

const CardStackArrows = ({
  isTouchDevice,
  showLeftArrow,
  showRightArrow,
  prevClick,
  nextClick,
  totalCardsinStack,
}: CardStackArrowsProps) => {
  if (isTouchDevice || totalCardsinStack < 2) return null;
  return (
    <>
      {showLeftArrow && (
        <CarouselArrow
          direction="left"
          onClick={prevClick}
          data-testid="Previous Slide"
          data-cy="Previous Slide"
        >
          <ArrowIcon direction="left" />
        </CarouselArrow>
      )}
      {showRightArrow && (
        <CarouselArrow
          direction="right"
          onClick={nextClick}
          data-testid="Next Slide"
          data-cy="Next Slide"
        >
          <ArrowIcon direction="right" />
        </CarouselArrow>
      )}
    </>
  );
};

export default CardStackArrows;
