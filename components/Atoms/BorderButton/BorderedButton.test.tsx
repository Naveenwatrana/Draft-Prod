import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import { screen } from '@testing-library/react';
import BorderedButton from '.';

describe('BorderButton', () => {
  it('should render and have follow label', () => {
    renderWithThemeStoreEvents(<BorderedButton label="Follow" onClick={() => {}} />);
    expect(screen.getByText('Follow')).toBeInTheDocument();
  });
});
