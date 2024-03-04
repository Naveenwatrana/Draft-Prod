import lang from 'common/lang';
import { useEffect, useState } from 'react';
import { projectPreviewProps } from 'pages/pro/onboarding/mobile/previewImage/types';
import {
  ButtonWrapper, Company, Duration, Form, FormButton, ImageContainer, ImageContainerHeader, ProjectItem, Role,
} from '../styles';

const {
  onBoarding: { project: projectCopy },
  buttonText,
} = lang;

const ProjectPreview = ({
  fullName,
  project,
  setTitle,
  setSubtitle,
  handleBack,
  handleSubmit,
}: projectPreviewProps) => {
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

  useEffect(() => {
    setTitle(projectCopy.projectPreviewTitle);
    setSubtitle(projectCopy.projectPreviewSubtitle);
  }, []);

  return (
    <>
      <Form>
        <ImageContainer>
          <ImageContainerHeader component="p">
            {fullName && fullName}
          </ImageContainerHeader>
          <ProjectItem>
            <Company component="p">
              {project.title && project.title}
            </Company>
            <Role component="p">
              {project.role && project.role}
            </Role>
            <Duration component="p">
              {startYear && endYear && `${startYear} - ${endYear}`}
            </Duration>
          </ProjectItem>
        </ImageContainer>
      </Form>
      <ButtonWrapper>
        <FormButton
          label={buttonText.next}
          fullWidth
          onClick={handleSubmit}
          primary
        />
        <FormButton
          label={buttonText.back}
          fullWidth
          onClick={() => handleBack()}
        />
      </ButtonWrapper>
    </>
  );
};

export default ProjectPreview;
