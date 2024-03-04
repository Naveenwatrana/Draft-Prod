import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import CompanyProfileLayout from '.';

describe('CompanyProfileLayout', () => {
  test('renders CompanyProfileLayout component', () => {
    renderWithThemeStoreEvents(
      <CompanyProfileLayout bio={<p>MyBio</p>}>
        Content
      </CompanyProfileLayout>,
    );
    const element = screen.getByText(/MyBio/i);
    expect(element).toBeInTheDocument();
  });
});
