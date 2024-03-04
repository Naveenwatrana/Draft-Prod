import { fireEvent, screen, waitFor } from '@testing-library/react';
import lang from 'common/lang';
import { renderWithThemeStoreEvents, renderWithTheme, withStore } from 'common/utils/testHelpers';
import JobDetail from './[id].page';

describe.skip('JobDetail', () => {
  it('should open the edit job page', () => {
    const navigateToEditPage = jest.fn();
    const jobData = {
      background: 'string',
      description: 'string',
      jobType: 'string',
      location: 'string',
      locationType: 'string',
      role: 'string',
      salaryFrom: 0,
      salaryTo: 0,
      snapshot: 'string',
      snapshotBackground: 'string',
      status: 'string',
      uuid: 'string',
      companyId: 'string',
    };
    renderWithThemeStoreEvents(<JobDetail jobData={jobData} loggedInUser={null} />);
    const { jobs } = lang;
    waitFor(() => {
      fireEvent.click(screen.getByText(jobs.edit));
      expect(navigateToEditPage).toHaveBeenCalledTimes(1);
    });
  });
});
