import { screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';
import TagSelect from '.';
const title = 'Test Title';
describe('TagSelect Component', () => {
  it('should render the component', () => {
    renderWithTheme(<TagSelect isSelected={false} toggleSelect={() => {}} label={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('should toggle the select', () => {
    const mockFn = jest.fn();
    renderWithTheme(<TagSelect isSelected={false} toggleSelect={mockFn} label={title} />);
    screen.getByText(title).click();
    expect(mockFn).toHaveBeenCalled();
  });
});
