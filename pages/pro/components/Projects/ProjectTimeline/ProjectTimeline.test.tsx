import { screen, waitFor } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import ProjectTimeline from 'pages/pro/components/Projects/ProjectTimeline/index';

describe('ProjectTimeline Component', () => {
  it('should render Project Timeline', () => {
    renderWithThemeStoreEvents(<ProjectTimeline />);
    waitFor(() => {
      const graph = screen.getByTestId('projectTimelineGraph');
      expect(graph).toBeInTheDocument();
    });
  });
});
