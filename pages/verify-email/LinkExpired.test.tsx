import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import lang from 'common/lang';
import LinkExpired from './LinkExpired';

const {
  SignUp: { linkExpired, linkExpiredMessage, resendVerificationLink },
} = lang;
describe('LinkExpired Component', () => {
  it('should render the component', () => {
    const onChange = jest.fn();
    renderWithThemeStoreEvents(<LinkExpired onResend={onChange} />);
    expect(screen.getByText(linkExpired)).toBeInTheDocument();
    expect(screen.getByText(linkExpiredMessage)).toBeInTheDocument();
    const resendButton = screen.getByTestId(resendVerificationLink);
    expect(resendButton).toBeInTheDocument();
  });
  it('should call the resend function on click', () => {
    const onChange = jest.fn();
    renderWithThemeStoreEvents(<LinkExpired onResend={onChange} />);
    const resendButton = screen.getByTestId(resendVerificationLink);
    resendButton.click();
    expect(onChange).toHaveBeenCalled();
  });
});
