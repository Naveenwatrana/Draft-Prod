import { screen } from '@testing-library/react';
import {
  renderWithThemeStoreEvents,
} from 'common/utils/testHelpers';
import JobCard from './JobCard';

describe('JobCard', () => {
  it('should render all elements correctly', () => {
    const companyName = 'Roblox';
    const role = 'Software Developer';

    renderWithThemeStoreEvents(
      <JobCard
        companyName={companyName}
        role={role}
      />,
    );
    expect(screen.getByText(companyName)).toBeInTheDocument();
    expect(screen.getByText(role)).toBeInTheDocument();
  });
});
