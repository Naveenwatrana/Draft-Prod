import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import PreviewCard from '.';

describe('PreviewCard', () => {
  it('should render the children', () => {
    renderWithThemeStoreEvents(
      <PreviewCard
        picture=""
      >
        <p>Hello</p>
      </PreviewCard>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
