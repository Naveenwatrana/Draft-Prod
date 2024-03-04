import { fireEvent, screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import KebabMenu from '.';

describe('Kebab Menu', () => {
  it('should render the menu without expanded view', () => {
    renderWithThemeStoreEvents(
      <KebabMenu
        list={<p>Hello</p>}
      />,
    );
    expect(screen.getByTestId('articleMenu')).toHaveStyle('visibility: hidden');
  });
  it('should render the menu with expanded view', () => {
    renderWithThemeStoreEvents(
      <KebabMenu
        list={<p>Hello</p>}
      />,
    );
    const button = screen.getByTestId('toggleMenu');
    fireEvent.click(button);
    expect(screen.getByTestId('articleMenu')).toHaveStyle('visibility: visible');
  });
});
