import { dateFormatMY } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import { calculateBarPosition, calculateBarWidth } from 'pages/pro/components/Projects/ProjectTimeline/components/Graph/util';
import { ProjectRole, ProjectTimelineBar, TimeSpan } from 'pages/pro/components/Projects/ProjectTimeline/components/ProjectBar/styles';
import { ProjectBarProps } from 'pages/pro/components/Projects/ProjectTimeline/components/ProjectBar/types';

const ProjectBar = ({
  project,
  lineWidth,
  timeLine,
  gridGap,
}: ProjectBarProps) => {
  let position: string | number = calculateBarPosition(project, lineWidth, timeLine, gridGap);
  let width = calculateBarWidth(project, lineWidth, gridGap);
  if (width < 1) {
    position = 'auto';
    width = 20;
  }
  return (
    <ProjectTimelineBar data-testid={`projectBar-${project.id}`} data-cy="project-bar" position={position} width={width}>
      <TimeSpan ongoing={project.ongoing} />
      <ProjectRole>{formatDate(project.startDate, dateFormatMY)}</ProjectRole>
    </ProjectTimelineBar>
  );
};

export default ProjectBar;
