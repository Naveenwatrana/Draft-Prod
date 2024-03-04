import Container from 'components/Container/Container';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';

describe('Container Component', () => {
  it('should show component with given data', () => {
    const onClickEvent = jest.fn();
    renderWithTheme(
      <Container heading="Bio" description="My Bio" buttonText="Add Bio" onClick={onClickEvent} title="Blogs" />,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('My Bio')).toBeTruthy();
    expect(screen.getByText('Bio')).toBeTruthy();
    expect(screen.getByText('Add Bio')).toBeTruthy();
    expect(onClickEvent).toHaveBeenCalled();
  });
});
