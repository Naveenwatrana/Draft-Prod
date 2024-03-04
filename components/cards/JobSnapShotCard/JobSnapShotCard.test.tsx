import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import JobSnapShotCard from './JobSnapShotCard';

describe('JobSnapShotCard', () => {
  it('should render all elements correctly', () => {
    const companyName = 'Roblox';
    const text = 'Test Text';

    renderWithThemeStoreEvents(
      <JobSnapShotCard companyName={companyName} text={text} />,
    );
    expect(screen.getByText(companyName)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
