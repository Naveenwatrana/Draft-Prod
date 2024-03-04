import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import '@testing-library/jest-dom/extend-expect';
import lang from 'common/lang';
import React from 'react';
import CommonFooter from '.';

const { footer } = lang.homePage;

describe('CommonFooter', () => {
  it('renders expected links', () => {
    renderWithThemeStoreEvents(<CommonFooter />);
    expect(screen.getByText(footer.termsOfUse)).toBeInTheDocument();
    expect(screen.getByText(footer.privacyPolicy)).toBeInTheDocument();
  });
});
