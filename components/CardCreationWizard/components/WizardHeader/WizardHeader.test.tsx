import { fireEvent, screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import WizardHeader from '.';

describe('Wizard Header component', () => {
  it('should render the title given', () => {
    const onClick = jest.fn();
    renderWithThemeStoreEvents(
      <WizardHeader
        title='test'
        onClose={onClick}
      />,
    );
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  it('should call the popup close function', () => {
    const onClick = jest.fn();
    renderWithThemeStoreEvents(
      <WizardHeader
        title='test'
        onClose={onClick}
      />,
    );
    const button = screen.getByTestId('wizardHeaderCloseButton');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
