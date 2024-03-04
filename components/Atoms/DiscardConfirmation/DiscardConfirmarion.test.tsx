import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import { fireEvent } from '@testing-library/react';
import DiscardConfirmation from '.';

describe('Discard confirmation Component', () => {
  it('should call onDiscard and closeModal method for clicking delete and cancel button respectively', () => {
    const onDiscard = jest.fn();
    const closeModal = jest.fn();
    const screen = renderWithThemeStoreEvents(
      <DiscardConfirmation
        onDiscard={onDiscard}
        isOpen={true}
        closeModal={closeModal}
      />,
    );
    const cancelButton = screen.getByTestId('cancelDiscardButton');
    const deleteButton = screen.getByTestId('deleteDiscardButton');
    fireEvent.click(cancelButton);
    expect(closeModal).toHaveBeenCalled();
    fireEvent.click(deleteButton);
    expect(onDiscard).toHaveBeenCalled();
  });
});
