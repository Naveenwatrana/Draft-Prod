import { screen, waitFor } from '@testing-library/react';
import lang from 'common/lang';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import SavedCards from '.';

const { savedCards } = lang;

describe('Saved Card Component', () => {
  it('should render No Card message', () => {
    renderWithThemeStoreEvents(
      <SavedCards />,
    );
    waitFor(() => {
      expect(screen.getByText(savedCards.noCards)).toBeInTheDocument();
    });
  });
});
