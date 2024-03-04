import { renderWithTheme } from 'common/utils/testHelpers';
import GraphGrid from 'pages/pro/components/Projects/ProjectTimeline/components/GraphGrid/index';

describe('Graph Grid Component', () => {
  it('should render Graph Grid component', () => {
    const { container } = renderWithTheme(<GraphGrid miniTimeline={false} lines={4} items={[0, 1]} />);
    expect(container.querySelector('div')?.children.length).toBe(3);
  });
});
