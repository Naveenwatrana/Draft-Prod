import ProfileCard from 'components/ProfileCard';
import { IStepConfig, PreviewCardProps } from 'pages/pro/onboarding/desktop/previewCard/types';
import MantraSection from 'pages/pro/onboarding/desktop/previewCard/mantraSection';
import NameSection from 'pages/pro/onboarding/desktop/previewCard/nameSection';
import ImageSection from 'pages/pro/onboarding/desktop/previewCard/imageSection';
import BioSection from 'pages/pro/onboarding/desktop/previewCard/bioSection';
import ProjectSection from 'pages/pro/onboarding/desktop/previewCard/projectSection';
import Info from '../../common/cardSlides/info';
import Bio from '../../common/cardSlides/bio';
import Project from '../../common/cardSlides/project';
import { ImageContainer } from './styles';

enum Steps {
  NAME = 1,
  IMAGE = 2,
  BIO = 3,
  PROJECT = 4,
  SUCCESS = 5,
}

const PreviewCard = ({
  fullName,
  picture,
  mantra,
  bio,
  project,
  currentStep,
  children,
}: PreviewCardProps) => {
  const slides = [
    <Info key={1} image={picture} mantra={mantra} fullName={fullName} />,
  ];

  if (bio) {
    slides.push(<Bio key={2} bio={bio} fullName={fullName} />);
  }

  if (project) {
    slides.push(<Project key={3} projects={project} fullName={fullName} />);
  }

  const stepConfigs: Record<Steps, IStepConfig> = {
    [Steps.NAME]: {
      content: (
        <>
          <NameSection fullName={fullName} />
          <ImageSection image={picture} />
        </>
      ),
    },
    [Steps.IMAGE]: {
      content: (
        <>
          <NameSection fullName={fullName} />
          <ImageSection image={picture} />
          <MantraSection mantra={mantra} />
        </>
      ),
    },
    [Steps.BIO]: {
      content: (
        <>
          <NameSection fullName={fullName} />
          <BioSection bio={bio} />
        </>
      ),
    },
    [Steps.PROJECT]: {
      content: (
        <>
          <NameSection fullName={fullName} />
          <ProjectSection project={project && project[0]} />
        </>
      ),
    },
    [Steps.SUCCESS]: {
      content: <ProfileCard slides={slides} />,
    },
  };

  const renderContent = stepConfigs[currentStep as unknown as Steps].content;

  return (
    <ImageContainer data-cy="job-image-container">
      {renderContent}
      {children}
    </ImageContainer>
  );
};

export default PreviewCard;
