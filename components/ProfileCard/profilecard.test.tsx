import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';

import Card from '.';

describe('Card', () => {
  it('should create slide for each item', () => {
    const slideData = [
      <div key={1}>One</div>,
      <div key={2}>Two</div>,
    ];
    renderWithThemeStoreEvents(<Card slides={slideData} />);
    screen.getByText('One');
    screen.getByText('Two');
    const previousArrow = screen.getByRole('button', { name: 'Previous Slide' });
    const nextArrow = screen.getByRole('button', { name: 'Next Slide' });
    expect(previousArrow).toBeInTheDocument();
    expect(nextArrow).toBeInTheDocument();
    const firstSlideDot = screen.getByRole('button', { name: '1' });
    const secondSlideDot = screen.getByRole('button', { name: '2' });
    expect(firstSlideDot).toBeInTheDocument();
    expect(secondSlideDot).toBeInTheDocument();
  });

  it('should not render arrow or dots if slide is only one', () => {
    const slideData = [
      <div key={1}>One</div>,
    ];
    renderWithThemeStoreEvents(<Card slides={slideData} />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
