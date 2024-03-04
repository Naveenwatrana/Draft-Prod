import {
  Company,
  Duration,
  ImageContainerHeader,
  ProjectItem,
  Role,
  SlideWrapper,
} from 'pages/pro/onboarding/common/cardSlides/styles';
import { IProjectAttributes, ProjectProps } from 'pages/pro/onboarding/common/cardSlides/types';

const Project = ({ projects, fullName }: ProjectProps) => {
  return (
    <>
      {projects.map(
        ({
          title, role, startDate, endDate,
        }: IProjectAttributes, index) => {
          const startYear = new Date(startDate).getFullYear().toString();
          const endYear = !endDate
            ? 'Present'
            : new Date(endDate).getFullYear().toString();

          return (
            // eslint-disable-next-line react/no-array-index-key
            <SlideWrapper key={index}>
              <ImageContainerHeader component="p">
                {fullName}
              </ImageContainerHeader>
              <ProjectItem key={title}>
                <Company component="p">{title}</Company>
                <Role component="p">{role && role}</Role>
                <Duration component="p">
                  {startYear && endYear && `${startYear} - ${endYear}`}
                </Duration>
              </ProjectItem>
            </SlideWrapper>
          );
        },
      )}
    </>
  );
};

export default Project;
