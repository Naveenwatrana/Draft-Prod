import { useEffect, useState } from 'react';
import { ProjectSectionProps } from 'pages/pro/onboarding/desktop/previewCard/types';
import { Duration, Field, ProjectItem } from './styles';

const ProjectSection = ({ project }: ProjectSectionProps) => {
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  useEffect(() => {
    if (project?.startDate) {
      setStartYear(new Date(project.startDate).getFullYear().toString());
    }
    if (project?.endDate) {
      setEndYear(new Date(project.endDate).getFullYear().toString());
    }
    if (project?.ongoing) {
      setEndYear('Present');
    }
  }, [project]);

  return project ? (
    <ProjectItem>
      <Field component="p">
        {project.title && project.title}
      </Field>
      <Field component="p">
        {project.role && project.role}
      </Field>
      <Duration component="p">
        {startYear && endYear && `${startYear} - ${endYear}`}
      </Duration>
    </ProjectItem>
  ) : null;
};

export default ProjectSection;
