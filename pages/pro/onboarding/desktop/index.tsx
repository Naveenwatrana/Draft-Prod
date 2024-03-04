import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'common/utils/router-fill';
import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import { useProfileQuery } from 'pages/pro/profileService';
import AddName from 'pages/pro/onboarding/desktop/addName';
import FormHeader from 'pages/pro/onboarding/desktop/formHeader';
import AddImage from 'pages/pro/onboarding/desktop/addImage';
import PreviewCard from 'pages/pro/onboarding/desktop/previewCard';
import { IApiValues, IStepConfig } from 'pages/pro/onboarding/desktop/types';
import AddBio from 'pages/pro/onboarding/desktop/addBio/addBio';
import AddProject from 'pages/pro/onboarding/desktop/addProject';
import OnboardingSuccess from 'pages/pro/onboarding/desktop/success';
import { Container, LeftPanel, RightPanel } from './styles';
import PlaceholderImage from '/public/images/defaultProfile.png';

const {
  onBoarding: {
    name: nameCopy, image, bio: biocopy, project: projectCopy,
  },
} = lang;

enum Steps {
  NAME = 1,
  IMAGE = 2,
  BIO = 3,
  PROJECT = 4,
  SUCCESS = 5,
}

const TOTAL_STEPS = 1;

const DesktopProfile = () => {
  const { data, isLoading } = useProfileQuery('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [name, setName] = useState('');
  const [currentStep, setCurrentStep] = useState(Steps.NAME);
  const [picture, setPicture] = useState(PlaceholderImage.src);
  const [mantra, setMantra] = useState('');
  const [bio, setBio] = useState('');
  const [project, setProject] = useState(undefined);

  const navigate = useNavigate();

  const setValuesFromAPI = (val : IApiValues) => {
    const stepsBelowCurrent = Object.values(Steps).filter(
      (step: Steps | string): step is Steps => (step as number) <= Steps.PROJECT && (step as number) < val.onboarding_step + 1,
    );

    stepsBelowCurrent.forEach((step: Steps) => {
      const apiCurrentStep = Steps[step].toLowerCase();

      if (apiCurrentStep === 'name') {
        setName(val.first_name + ' ' + val.last_name);
      }
      if (apiCurrentStep === 'image') {
        if (val?.presigned_profile_cover) {
          setPicture(val.presigned_profile_cover);
        }
        if (val.mantra) {
          setMantra(val.mantra);
        }
      }
      if (apiCurrentStep === 'bio' && val.bio) {
        setBio(val.bio);
      }
    });
  };

  useEffect(() => {
    if (data) {
      setValuesFromAPI(data.data);
      const { onboarding_status: status, onboarding_step: step } = data.data;
      if (status) {
        navigate('/profile');
      }
      step && setCurrentStep(step + 1);
    }
  }, [data]);

  const stepConfigs: Record<Steps, IStepConfig> = {
    [Steps.NAME]: {
      content: (
        <AddName
          nextStep={() => setCurrentStep(Steps.SUCCESS)}
          setFullName={setName}
        />
      ),
      title: nameCopy.title,
      subtitle: nameCopy.subtitle,
    },
    [Steps.IMAGE]: {
      content: (
        <AddImage
          imagePreview={setPicture}
          setMantra={setMantra}
          nextStep={() => setCurrentStep(Steps.BIO)}
        />
      ),
      title: image.desktopTitle,
      subtitle: image.desktopSubtitle,
    },
    [Steps.BIO]: {
      content: (
        <AddBio
          setBio={setBio}
          nextStep={() => setCurrentStep(Steps.PROJECT)}
        />
      ),
      title: biocopy.desktopTitle,
      subtitle: biocopy.desktopSubtitle,
    },
    [Steps.PROJECT]: {
      content: (
        <AddProject
          setProject={setProject}
          nextStep={() => setCurrentStep(Steps.SUCCESS)}
        />
      ),
      title: projectCopy.title,
      subtitle: projectCopy.subtitle,
    },
    [Steps.SUCCESS]: {
      content: <OnboardingSuccess />,
      title: 'Success',
      subtitle: 'Success',
    },
  };

  const renderContent = useMemo(
    () => stepConfigs[currentStep].content,
    [currentStep],
  );

  useEffect(() => {
    setTitle(stepConfigs[currentStep].title);
    setSubtitle(stepConfigs[currentStep].subtitle);
  }, [currentStep]);

  return (
    <>
      {isLoading && <Loader data-testid="loader" />}
      {!isLoading && !data.data.onboarding_status && (
        <Container>
          <LeftPanel>
            {currentStep !== Steps.SUCCESS && (
              <FormHeader
                totalSteps={TOTAL_STEPS}
                currentStep={currentStep}
                title={title}
                subtitle={subtitle}
              />
            )}
            {renderContent}
          </LeftPanel>
          <RightPanel>
            <PreviewCard
              fullName={name}
              picture={picture}
              mantra={mantra}
              bio={bio}
              project={project && [project]}
              currentStep={currentStep}
            />
          </RightPanel>
        </Container>
      )}
    </>
  );
};

export default DesktopProfile;
