import { screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';
import { WordCounter } from 'components/WordCounter/WordCounter';

describe('Word Counter validator', () => {
  it('should show count and total words', () => {
    renderWithTheme(<WordCounter total={10} count={2} />);
    const validation = screen.getByText('2/10');
    expect(validation).toBeInTheDocument();
  });
});
