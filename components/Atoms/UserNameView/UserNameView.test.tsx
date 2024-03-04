import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import { screen } from '@testing-library/react';
import UserNameView from '.';

describe('UserNameView', () => {
  it('should render button if userNameClickable is false', () => {
    renderWithThemeStoreEvents(<UserNameView userNameClickable={false} primaryText="User" />);
    expect(screen.getByRole('button').textContent).toContain('User');
  });
  it('should render primary if userNameClickable is true', () => {
    renderWithThemeStoreEvents(<UserNameView userNameClickable userId="123" isAuthorCompany primaryText="User Click" />);
    expect(screen.getByRole('link').textContent).toContain('User Click');
  });
});
