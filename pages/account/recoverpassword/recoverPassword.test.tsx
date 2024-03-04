import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import RecoverPassword from 'pages/account/recoverpassword/index.page';
import lang from 'common/lang';

const { RecoverPassword: RecoverPassCopy } = lang;

describe('RecoverPassword', () => {
  it('should render all elements correctly', () => {
    renderWithThemeStoreEvents(<RecoverPassword />);
    expect(
      screen.getByRole('heading', { name: RecoverPassCopy.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(RecoverPassCopy.emailLabel)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(RecoverPassCopy.emailPlaceholder)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: RecoverPassCopy.submitButtonLabel,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: RecoverPassCopy.cancelText })).toBeInTheDocument();
  });

  it('will not submit form when email is incomplete', async () => {
    const { user } = renderWithThemeStoreEvents(<RecoverPassword />);
    const emailInput = screen.getByPlaceholderText(RecoverPassCopy.emailPlaceholder);
    const submitButton = screen.getByRole('button', {
      name: RecoverPassCopy.submitButtonLabel,
    });
    await user.type(emailInput, 'test');
    await user.click(submitButton);
    const emailError = await screen.findByText(/email must be a valid email/i);
    expect(emailError).toBeInTheDocument();
  });

  it('api returns error if invalid email is submitted', async () => {
    const { user } = renderWithThemeStoreEvents(<RecoverPassword />);
    const emailInput = screen.getByPlaceholderText(RecoverPassCopy.emailPlaceholder);
    const submitButton = screen.getByRole('button', {
      name: RecoverPassCopy.submitButtonLabel,
    });
    await user.type(emailInput, 'test@email.c');
    await user.click(submitButton);
    const emailError = await screen.findByText(/This email address is invalid/i);
    expect(emailError).toBeInTheDocument();
  });

  it('api returns error if unregister email is submitted', async () => {
    const { user } = renderWithThemeStoreEvents(<RecoverPassword />);
    const emailInput = screen.getByPlaceholderText(RecoverPassCopy.emailPlaceholder);
    const submitButton = screen.getByRole('button', {
      name: RecoverPassCopy.submitButtonLabel,
    });
    await user.type(emailInput, 'test@email.com');
    await user.click(submitButton);
    const emailError = await screen.findByText(
      /No user record found with provided email/i,
    );
    expect(emailError).toBeInTheDocument();
  });

  it('success page is rendered if valid email is submitted', async () => {
    const { user } = renderWithThemeStoreEvents(<RecoverPassword />);
    const emailInput = screen.getByPlaceholderText(RecoverPassCopy.emailPlaceholder);
    const submitButton = screen.getByRole('button', {
      name: RecoverPassCopy.submitButtonLabel,
    });
    await user.type(emailInput, 'user@email.com');
    await user.click(submitButton);
    const successMessage = await screen.findByText(
      /If an account exists for user@email.com/i,
    );
    expect(successMessage).toBeInTheDocument();
  });
});
