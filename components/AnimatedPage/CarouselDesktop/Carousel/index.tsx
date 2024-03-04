import { useWindowDimensions } from 'common/hooks';
import { CarouselProps } from 'components/AnimatedPage/types';
import { Slides } from './styles';

const Carousel = ({
  cards,
  currentIndex,
  inView,
  showLeftCard,
  showRightCard,
}: CarouselProps) => {
  const { windowDimensions } = useWindowDimensions();
  if (cards.length <= 1) {
    return <Slides>{cards[0]}</Slides>;
  }
  return (
    <>
      {cards.map((card, index) => {
        const isLgScreen = windowDimensions.width > 1900;
        const isCenter = index === currentIndex;
        let isLeft = index === (currentIndex + 1) % cards.length;
        if (cards.length < 3 && index < currentIndex) {
          isLeft = false;
        }
        let isRight = index === (currentIndex - 1 + cards.length) % cards.length;
        if (cards.length < 3 && index > currentIndex) {
          isRight = false;
        }

        let cardPos;
        switch (true) {
          case inView:
            cardPos = 'right';
            break;
          case isCenter:
            cardPos = 'center';
            break;
          case isLeft:
            cardPos = 'sideLeft';
            break;
          default:
            cardPos = 'sideRight';
            break;
        }

        const cardVariants = {
          center: { x: 0, z: 0 },
          sideRight: { x: isLgScreen ? 200 : 150, z: -200 },
          sideLeft: { x: isLgScreen ? -200 : -150, z: -200 },
          right: { x: 0, z: 0 },
        };

        const cardStyle = {
          scale: isCenter ? '1' : '0.9',
          zIndex: isCenter ? cards.length + 1 : index + 1,
          display:
            (isLeft && !showLeftCard) || (isRight && !showRightCard)
              ? 'none'
              : 'flex',
        };

        const cardTransition = {
          duration: 0.4,
          type: 'easeInOut',
        };

        return (
          <Slides
            /* eslint-disable-next-line react/no-array-index-key */
            key={index}
            style={cardStyle}
            variants={cardVariants}
            animate={cardPos}
            transition={inView ? cardTransition : undefined}
            data-cy={`slide-${index + 1}`}
          >
            {card}
          </Slides>
        );
      })}
    </>
  );
};

export default Carousel;
