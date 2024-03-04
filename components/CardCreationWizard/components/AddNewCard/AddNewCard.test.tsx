import { fireEvent, screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import lang from 'common/lang';
import { theme } from 'common/theme';
import AddNewCard from '.';

const { cardCreationWizard: { addCard } } = lang;
const activeColor = theme.palette.green[100].value;
const disableTextColor = "#515253"; // TODO: use theme

describe('Add New Card component', () => {
  it('should render the card in disable state', () => {
    renderWithThemeStoreEvents(
      <AddNewCard
        active={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByText(addCard)).toHaveStyle(`color: ${disableTextColor}`);
    expect(screen.getByTestId('AddNewCardButton')).toBeDisabled();
  });
  it('should render the card in active state', () => {
    renderWithThemeStoreEvents(
      <AddNewCard
        active
        onClick={() => {}}
      />,
    );
    expect(screen.getByText(addCard)).toHaveStyle(`color: ${activeColor}`);
    expect(screen.getByTestId('AddNewCardButton')).not.toBeDisabled();
  });
  it('should call the onclick function', () => {
    const onClick = jest.fn();
    renderWithThemeStoreEvents(
      <AddNewCard
        active
        onClick={onClick}
      />,
    );
    const button = screen.getByTestId('AddNewCardButton');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
