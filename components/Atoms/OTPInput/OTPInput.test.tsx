import { screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';
import OTPInput from '.';

const otpValue = '123456';
const error = { message: 'Error Message', type: '' };
describe('OTPInput Component', () => {
  it('should render the component', () => {
    renderWithTheme(<OTPInput value="123456" onChange={() => {}} />);
    otpValue
      .split('')
      .forEach((otp) => expect(screen.getByTestId(otp)).toBeInTheDocument());
  });
  it('should render error', () => {
    renderWithTheme(
      <OTPInput value="123456" onChange={() => {}} error={error} />,
    );
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });
});
