import { useTouchDetection } from 'common/hooks/useTouchDetection';
import { useCallback, useRef, useState } from 'react';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import CardStackArrows from './CardStackArrows';
import CardStackHeader from './CardStackHeader';
import {
  StyledCarousel,
  StyledSlide,
} from './styles';
import { CarouselProps } from './types';

const CardStackCarousel = ({
  width,
  height,
  slides,
  cardType,
  totalCardsinStack,
  data,
  onSave,
  isSaveLoading,
  hideHeader,
  onClick,
  userId,
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const touchStartX = useRef<number>(0);
  const touchMoveX = useRef<number>(0);
  const isTouchDevice = useTouchDetection();
  const showLeftArrow = activeIndex !== 0;
  const showRightArrow = activeIndex !== slides.length - 1;
  const cardStackType = cardType.toUpperCase();
  const { saveInteraction } = useAladdinInteraction();
  const handleNextClick = useCallback(() => {
    if (showRightArrow) {
      if (activeIndex === 0 && userId) {
        saveInteraction({
          itemId: userId as string,
          itemType: IInteractionItemTypes.users,
          eventType: IInteractionTypes.ViewCard,
          eventValue: 1,
        });
      }
      if (userId) {
        saveInteraction({
          itemId: userId as string,
          itemType: IInteractionItemTypes.users,
          eventType: IInteractionTypes.ViewCard,
          eventValue: activeIndex + 2,
        });
      }
      setActiveIndex(activeIndex + 1);
    }
  }, [showRightArrow, activeIndex]);

  const handlePrevClick = useCallback(() => {
    if (showLeftArrow) {
      setActiveIndex(activeIndex - 1);
      if (userId) {
        saveInteraction({
          itemId: userId as string,
          itemType: IInteractionItemTypes.users,
          eventType: IInteractionTypes.ViewCard,
          eventValue: activeIndex,
        });
      }
    }
  }, [showLeftArrow, activeIndex]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchMoveX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchMoveX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchMoveX.current > 50) {
      handleNextClick();
    } else if (touchStartX.current - touchMoveX.current < -50) {
      handlePrevClick();
    }
  };
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledCarousel
      width={width}
      height={height}
      data-testid="cardStackCarousel"
      data-cy="cardStackCarousel"
      onClick={handleClick}
    >
      {slides.map((slide, index) => (
        <StyledSlide
          key={index /* eslint-disable-line react/no-array-index-key */}
          width={width}
          height={height}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          index={index}
          activeIndex={activeIndex}
          style={{
            transform: `translateX(${(index - activeIndex) * (width ? width : 350)}px)`,
          }}
          className={index === activeIndex ? 'active' : ''}
        >
          {slide}
        </StyledSlide>
      ))}
      <CardStackHeader
        activeIndex={activeIndex}
        totalCardsinStack={totalCardsinStack}
        cardStackType={cardStackType}
        isTouchDevice={isTouchDevice}
        data={data}
        onSave={onSave}
        isLoading={isSaveLoading}
        hideHeader={hideHeader}
      />
      <CardStackArrows
        isTouchDevice={isTouchDevice}
        showLeftArrow={showLeftArrow}
        showRightArrow={showRightArrow}
        prevClick={handlePrevClick}
        nextClick={handleNextClick}
        totalCardsinStack={totalCardsinStack}
      />
    </StyledCarousel>
  );
};

export default CardStackCarousel;
