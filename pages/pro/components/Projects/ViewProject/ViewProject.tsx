import { useWindowDimensions } from 'common/hooks';
import Project from 'pages/pro/components/Projects/ViewProject/Project';
import {
  Container,
} from 'pages/pro/components/Projects/ViewProject/styles';
import { ViewProjectProps } from 'pages/pro/components/Projects/ViewProject/types';
import DesktopProject from 'pages/pro/components/Projects/ViewProject/DesktopProjects';

const ViewProject = ({ projects }: ViewProjectProps) => {
  const { isDesktopView } = useWindowDimensions();
  return (
    <Container>
      {!isDesktopView && projects.map((project) => (
        <Project key={project.id} data={project} />
      ))}
      {isDesktopView && projects.map((project) => (
        <DesktopProject key={project.id} data={project} />
      ))}
    </Container>
  );
};

export default ViewProject;
