import { screen, waitFor } from '@testing-library/react';
import { renderWithThemeStoreEvents, withStore } from 'common/utils/testHelpers';
import lang from 'common/lang';
import DesktopProfile from 'pages/pro/onboarding/desktop/index';

describe('DesktopOnboarding', () => {
  const { onBoarding: { name } } = lang;

  it('should render all elements correctly', () => {
    renderWithThemeStoreEvents(<DesktopProfile />);
    waitFor(() => {
      screen.getByText(name.title);
      screen.getByText(name.subtitle);
    });
  });
});
