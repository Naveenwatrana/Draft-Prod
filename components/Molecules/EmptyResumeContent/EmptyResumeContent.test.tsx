import { screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';
import EmptyResumeContent from '.';
const title = 'Test Title';
const desc = 'Test Description';
describe('EmptyResumeContent Component', () => {
  it('should be clicked on button', () => {
    const mockFn = jest.fn();
    renderWithTheme(
      <EmptyResumeContent
        description={desc}
        buttonLabel={title}
        onClick={mockFn}
        show
      />,
    );
    screen.getByText(title).click();
    expect(mockFn).toHaveBeenCalled();
  });
});
