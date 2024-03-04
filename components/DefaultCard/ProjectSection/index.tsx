/* eslint-disable react/jsx-one-expression-per-line */
import { ProjectSectionProps } from '../types';
import {
  ProjectContainer,
  ProjectDuration,
  ProjectName,
  ProjectRole,
  ProjectWrapper,
} from './styles';

const ProjectSection = ({ primaryFontSize, projects }: ProjectSectionProps) => {
  if (!projects || projects?.length < 1) return null;
  return (
    <ProjectContainer margin={primaryFontSize}>
      {projects?.map(({ name, role, duration }, index) => (
        <ProjectWrapper
          key={index /* eslint-disable-line react/no-array-index-key */}
        >
          <ProjectName component="h5">{name}</ProjectName>
          <ProjectRole component="h5">{role}</ProjectRole>
          <ProjectDuration>
            {duration?.from} - {duration?.to}
          </ProjectDuration>
        </ProjectWrapper>
      ))}
    </ProjectContainer>
  );
};

export default ProjectSection;
