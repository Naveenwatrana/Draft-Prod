import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import ImageCropperMobile from './ImageCropperMobile';

describe('Image Cropper Mobile Component', () => {
  it('should check the image cropper mobile buttons', () => {
    const onCancel = jest.fn();
    const handleEditImage = jest.fn();
    renderWithThemeStoreEvents(
      <ImageCropperMobile
        handleEditImage={handleEditImage}
        onCancel={onCancel}
        imageUrl=""
      />,
    );
    expect(screen.getByTestId('ImageCropperCancelButton')).toBeEnabled();
    const cancelButton = screen.getByTestId('ImageCropperCancelButton');
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
    expect(screen.getByTestId('ImageCropperSubmitButton')).toBeEnabled();
    const submitButton = screen.getByTestId('ImageCropperSubmitButton');
    fireEvent.click(submitButton);
    waitFor(() => {
      expect(handleEditImage).toHaveBeenCalled();
    });
  });
});
