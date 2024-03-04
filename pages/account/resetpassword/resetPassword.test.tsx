import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import ResetPassword from 'pages/account/resetpassword/[token].page';
import lang from 'common/lang';

const { ResetPassword: ResetPassCopy, PasswordError } = lang;

describe('ResetPassword', () => {
  it('should render all elements correctly', () => {
    renderWithThemeStoreEvents(<ResetPassword />);

    expect(
      screen.getByRole('heading', { name: ResetPassCopy.title }),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(ResetPassCopy.passwordPlaceholder),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(ResetPassCopy.passwordConfirmPlaceholder),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: ResetPassCopy.submitButtonLabel,
      }),
    ).toBeInTheDocument();
  });

  it("will not submit form when password is incomplete or doesn't match", async () => {
    const { user } = renderWithThemeStoreEvents(<ResetPassword />);
    const passwordInput = screen.getByPlaceholderText(ResetPassCopy.passwordPlaceholder);
    const confirmPasswordInput = screen.getByPlaceholderText(
      ResetPassCopy.passwordConfirmPlaceholder,
    );
    const submitButton = screen.getByRole('button', {
      name: ResetPassCopy.submitButtonLabel,
    });
    await user.type(passwordInput, 'test');
    await user.type(confirmPasswordInput, 'test');
    await user.click(submitButton);
    const passwordError = await screen.findByText(PasswordError.passwordMinError);
    expect(passwordError).toBeInTheDocument();
    await user.type(confirmPasswordInput, 'tests');
    await user.click(submitButton);
    const passwordMatchError = await screen.findByText(
      PasswordError.passwordConfirmRequiredError,
    );
    expect(passwordMatchError).toBeInTheDocument();
  });
});
