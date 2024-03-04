import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'common/utils/router-fill';
import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import { useProfileQuery } from 'pages/pro/profileService';
import { useAppDispatch } from 'common/hooks/state';
import AddName from 'pages/pro/onboarding/mobile/addName';
import FormHeader from 'pages/pro/onboarding/mobile/formHeader';
import { IStepConfig } from 'pages/pro/onboarding/mobile/types';
import RootComp from 'pages/pro/onboarding/mobile/addImage';
import AddBio from 'pages/pro/onboarding/mobile/addBio';
import AddProject from 'pages/pro/onboarding/mobile/addProject';
import { IApiValues } from '../desktop/types';
import {
  selectOnboardingData,
  setUserBio,
  setUserFullName,
  setUserImage,
  setUserMantra,
} from './onboardingSlice';
import { Container } from './styles';
import Success from './success';

const {
  onBoarding: { name },
} = lang;

enum Steps {
  NAME = 1,
  IMAGE = 2,
  BIO = 3,
  PROJECT = 4,
  SUCCESS = 5,
}

const TOTAL_STEPS = 4;

const MobileProfile = () => {
  const { data, isLoading } = useProfileQuery('');
  const [fullName, setFullName] = useState('');
  const [currentStep, setCurrentStep] = useState(Steps.NAME);
  const [title, setTitle] = useState(name.title);
  const [subtitle, setSubtitle] = useState(name.subtitle);
  const onboardingData = useSelector(selectOnboardingData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setValuesFromAPI = (val: IApiValues) => {
    const stepsBelowCurrent = Object.values(Steps).filter(
      (step: Steps | string): step is Steps => step <= Steps.PROJECT && step < val.onboarding_step + 1,
    );

    stepsBelowCurrent.forEach((step: Steps) => {
      const apiCurrentStep = Steps[step].toLowerCase();

      if (apiCurrentStep === 'name') {
        setFullName(val.first_name + ' ' + val.last_name);
        dispatch(setUserFullName(val.first_name + ' ' + val.last_name));
      }
      if (apiCurrentStep === 'image') {
        if (val?.presigned_profile_cover) {
          dispatch(setUserImage(val.presigned_profile_cover));
        }
        if (val.mantra) {
          dispatch(setUserMantra(val.mantra));
        }
      }
      if (apiCurrentStep === 'bio' && val.bio) {
        dispatch(setUserBio(val.bio));
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
          nextStep={() => setCurrentStep(Steps.IMAGE)}
          setName={setFullName}
        />
      ),
    },
    [Steps.IMAGE]: {
      content: (
        <RootComp
          fullName={fullName}
          nextStep={() => setCurrentStep(Steps.BIO)}
          setTitle={setTitle}
          setSubtitle={setSubtitle}
        />
      ),
    },
    [Steps.BIO]: {
      content: (
        <AddBio
          fullName={fullName}
          nextStep={() => setCurrentStep(Steps.PROJECT)}
          setTitle={setTitle}
          setSubtitle={setSubtitle}
        />
      ),
    },
    [Steps.PROJECT]: {
      content: (
        <AddProject
          fullName={fullName}
          nextStep={() => setCurrentStep(Steps.SUCCESS)}
          setTitle={setTitle}
          setSubtitle={setSubtitle}
        />
      ),
    },
    [Steps.SUCCESS]: {
      content: (
        <Success
          setTitle={setTitle}
          setSubtitle={setSubtitle}
          onBoardingData={onboardingData}
        />
      ),
    },
  };

  const renderContent = useMemo(
    () => stepConfigs[currentStep].content,
    [currentStep],
  );

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !data.data.onboarding_status && (
        <Container>
          <FormHeader
            totalSteps={TOTAL_STEPS}
            currentStep={currentStep}
            title={title}
            subtitle={subtitle}
          />
          {renderContent}
        </Container>
      )}
    </>
  );
};

export default MobileProfile;
