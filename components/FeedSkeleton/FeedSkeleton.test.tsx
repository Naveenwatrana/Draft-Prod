import { act, fireEvent, screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import FeedSkeleton from '.';

describe('FeedSkeleton', () => {
  const breakpoints = [
    { screenWidth: 1700, numCards: 10 },
    { screenWidth: 1200, numCards: 8 },
    { screenWidth: 992, numCards: 6 },
    { screenWidth: 768, numCards: 4 },
    { screenWidth: 0, numCards: 2 },
  ];

  it('updates number of BlankCards correctly on window resize', () => {
    renderWithThemeStoreEvents(<FeedSkeleton />);
    breakpoints.forEach(({ screenWidth, numCards }) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: screenWidth,
      });
      act(() => {
        fireEvent(window, new Event('resize'));
      });
      const numCardsRendered = screen.getAllByTestId('skeletonCard');
      expect(numCardsRendered.length).toBe(numCards);
    });
  });
});
