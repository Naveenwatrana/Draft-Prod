import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import lang from 'common/lang';
import AddImage from 'pages/pro/onboarding/desktop/addImage/index';

const { onBoarding: { image, mantra }, buttonText } = lang;
const setPicture = jest.fn();
const setMantra = jest.fn();
const nextStep = jest.fn();

describe('Add Image and Mantra Step', () => {
  it('should render all elements correctly', () => {
    renderWithThemeStoreEvents(<AddImage imagePreview={setPicture} setMantra={setMantra} nextStep={nextStep} />);
    expect(screen.getByText(mantra.mantraLabel)).toBeInTheDocument();
    expect(screen.getByText(image.imageLabel)).toBeInTheDocument();
    const mantraInput = screen.getByPlaceholderText(mantra.mantraPlaceholder);
    expect(mantraInput).toBeInTheDocument();
    const imageInputLabel = screen.getByText(image.imageInputLabel);
    const imageInputBrowse = screen.getByText(image.imageInputBrowse);
    const imageInputInfo = screen.getByText(image.imageInputInfo);
    expect(imageInputLabel).toBeInTheDocument();
    expect(imageInputBrowse).toBeInTheDocument();
    expect(imageInputInfo).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: buttonText.next });
    const skipButton = screen.getByRole('button', { name: buttonText.skip });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    expect(skipButton).toBeInTheDocument();
  });

  it('should allow user to input mantra which will enable button', async () => {
    const { user } = renderWithThemeStoreEvents(<AddImage imagePreview={setPicture} setMantra={setMantra} nextStep={nextStep} />);
    const mantraInput = screen.getByPlaceholderText(mantra.mantraPlaceholder);
    const nextButton = screen.getByRole('button', { name: buttonText.next });
    await user.type(mantraInput, 'this is a test mantra');
    expect(nextButton).not.toBeDisabled();
  });

  it('should submit form when user clicks next if mantra is added', async () => {
    const { user } = renderWithThemeStoreEvents(<AddImage imagePreview={setPicture} setMantra={setMantra} nextStep={nextStep} />);
    const mantraInput = screen.getByPlaceholderText(mantra.mantraPlaceholder);
    const nextButton = screen.getByRole('button', { name: buttonText.next });
    await user.type(mantraInput, 'this is a test mantra');
    expect(setMantra).toHaveBeenCalled();
    nextButton.click();
    // TODO: check if the next step is rendered
  });
});
