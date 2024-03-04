import { PasswordValidator } from 'components/PasswordValidator/Password';
import { screen } from '@testing-library/react';
import { REGEX_CAPITAL_LETTER, REGEX_MIN_EIGHT_CHARACTER, REGEX_SPECIAL_CHARACTER } from 'common/constants';
import { renderWithTheme } from 'common/utils/testHelpers';
import { theme } from 'common/theme';

describe('Password validator', () => {
  const upperCaseValidation = { message: '1 upper case letter', valid: (value: string) => REGEX_CAPITAL_LETTER.test(value), id: 1 };
  const minCharacterValidation = { message: '8 Characters', valid: (value: string) => REGEX_MIN_EIGHT_CHARACTER.test(value), id: 2 };
  const specialCharacterValidation = { message: '1 special characer', valid: (value: string) => REGEX_SPECIAL_CHARACTER.test(value), id: 3 };
  const errorColor = theme.palette.red['100'].value;
  const validColor = theme.palette.white['100'].value;

  it('should show upper case validation failed', () => {
    renderWithTheme(
      <PasswordValidator
        validations={[upperCaseValidation]}
        value="sarab@123"
        touched
      />,
    );
    const validation = screen.getByText('1 upper case letter');
    expect(validation).toHaveStyle({ color: errorColor });
  });

  it('should show upper case validation passed', () => {
    renderWithTheme(<PasswordValidator
      validations={[upperCaseValidation]}
      value="Sarab@123"
      touched
    />);
    const validation = screen.getByText('1 upper case letter');
    expect(validation).toHaveStyle({ color: validColor });
  });

  it('should show min characters validation passed', () => {
    renderWithTheme(<PasswordValidator
      validations={[minCharacterValidation]}
      value="Sarab@31"
      touched
    />);
    const validation = screen.getByText('8 Characters');
    expect(validation).toHaveStyle({ color: validColor });
  });

  it('should show min characters validation failed', () => {
    renderWithTheme(<PasswordValidator
      validations={[minCharacterValidation]}
      value="Sarab"
      touched
    />);
    const validation = screen.getByText('8 Characters');
    expect(validation).toHaveStyle({ color: errorColor });
  });

  it('should show special character validation failed', () => {
    renderWithTheme(<PasswordValidator
      validations={[specialCharacterValidation]}
      value="Sarab"
      touched
    />);
    const validation = screen.getByText('1 special characer');
    expect(validation).toHaveStyle({ color: errorColor });
  });

  it('should show special character validation passed', () => {
    renderWithTheme(<PasswordValidator
      validations={[specialCharacterValidation]}
      value="Sarab@"
      touched
    />);
    const validation = screen.getByText('1 special characer');
    expect(validation).toHaveStyle({ color: validColor });
  });

  it('should not show validations if forms are not yet populated', () => {
    renderWithTheme(<PasswordValidator
      validations={[specialCharacterValidation]}
      value=""
    />);
    const validation = screen.getByText('1 special characer');
    expect(validation).toHaveStyle({ color: validColor });
  });
});
