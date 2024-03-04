import { useEffect, useState } from 'react';
import { BlankCard, FeedContainer } from './styles';

type Breakpoint = {
  screenWidth: number;
  numCards: number;
};

const breakpoints: Breakpoint[] = [
  { screenWidth: 1700, numCards: 10 },
  { screenWidth: 1200, numCards: 8 },
  { screenWidth: 992, numCards: 6 },
  { screenWidth: 768, numCards: 4 },
  { screenWidth: 0, numCards: 2 },
];

const FeedSkeleton = (): JSX.Element => {
  const [numCards, setNumCards] = useState<number>(2);

  useEffect(() => {
    const handleResize = (): void => {
      if (typeof window !== 'undefined') {
        const screenWidth: number = window.innerWidth;
        const breakpoint: Breakpoint | undefined = breakpoints.find(
          ({ screenWidth: bpWidth }: Breakpoint) => screenWidth >= bpWidth,
        );
        if (breakpoint) {
          setNumCards(breakpoint.numCards);
        }
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <FeedContainer data-cy="feedContainer">
      {[...Array(numCards)].map((_, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <BlankCard key={index} data-testid="skeletonCard" data-cy="skeletonCard" />
      ))}
    </FeedContainer>
  );
};

export default FeedSkeleton;
