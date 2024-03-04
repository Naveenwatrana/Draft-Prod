import Divider from 'components/Divider/Divider';
import { screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';

describe('Divider Component', () => {
  it('should render Divider with given class name', () => {
    renderWithTheme(<Divider />);
    const divider = screen.getByTestId('divider');
    expect(divider).toBeInTheDocument();
  });
});
