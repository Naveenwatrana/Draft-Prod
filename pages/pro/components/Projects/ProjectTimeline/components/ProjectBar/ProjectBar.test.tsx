import { screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';
import PorjectBar from 'pages/pro/components/Projects/ProjectTimeline/components/ProjectBar/index';

describe('PorjectBar Component', () => {
  it('should render Project Bar of correct size', () => {
    const project = {
      title: 'My first project assignment',
      description: 'project description',
      startDate: '2022-10-12',
      endDate: '2022-12-04',
      ongoing: false,
      id: 2,
    };
    renderWithTheme(<PorjectBar project={project} lineWidth={20} timeLine="2022-02-02" gridGap={10} />);
    const projectBar = screen.getByTestId('projectBar-2');
    const style = window.getComputedStyle(projectBar);
    expect(style.width).toBe('4px');
  });
});
