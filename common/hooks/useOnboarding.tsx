import { selectCurrentUser, setUserAuth } from 'pages/account/authSlice';
import {
  useCallback, useState,
} from 'react';
import {
  CreateOnBoardingSteps,
  IOnBoardingValues,
} from 'pages/profile/onboarding/create/types';
import { useNavigate } from 'common/utils/router-fill';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { onboardingUrl, userProfileUrl } from 'common/utils/network/appRouts';
import { userApiEndpoint } from 'pages/api/const';
import { useAppDispatch, useAppSelector } from './state';

const useOnboarding = (onboardingStep: number) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [step, setStep] = useState<number>(onboardingStep ? CreateOnBoardingSteps.NAME + onboardingStep : CreateOnBoardingSteps.NAME);
  const [loading, setLoading] = useState<boolean>(false);
  const [onBoardingDetails, setOnBoardingDetails] = useState<IOnBoardingValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleNext = (values: IOnBoardingValues) => {
    setOnBoardingDetails(values);
    setStep(CreateOnBoardingSteps.RESUME);
  };
  const handleResumeNext = async () => {
    setLoading(true);
    if (currentUser?.onboarding_step < CreateOnBoardingSteps.RESUME) {
      fetch(userApiEndpoint, {
        method: 'PUT',
        body: JSON.stringify({
          type: 'onboarding',
          onboarding_step: CreateOnBoardingSteps.RESUME,
        }),
      })
        .then((res) => res.json().then((resp) => {
          if (resp.errors) {
            showNotification(
              resp?.errors?.message || resp?.message,
              NotificationType.ERROR,
            );
          } else {
            dispatch(setUserAuth(resp.data));
            handleBrandSkip();
          }
        }))
        .catch((error) => showNotification(error?.message, NotificationType.ERROR))
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setStep(CreateOnBoardingSteps.BRAND);
    }
  };

  const handleBrandSkip = useCallback(() => {
    navigate(userProfileUrl(currentUser?.username));
  }, [currentUser?.username, navigate]);

  const handleBrandNext = async () => {
    setLoading(true);
    fetch(userApiEndpoint, {
      method: 'PUT',
      body: JSON.stringify({
        type: 'onboarding',
        onboarding_step: CreateOnBoardingSteps.BRAND,
      }),
    })
      .then((res) => res.json().then((resp) => {
        if (resp.errors) {
          showNotification(
            resp?.errors?.message || resp?.message,
            NotificationType.ERROR,
          );
        } else {
          navigate(userProfileUrl(currentUser?.username));
          dispatch(setUserAuth(resp.data));
        }
      }))
      .catch((error) => {
        showNotification(error?.message, NotificationType.ERROR);
        setLoading(false);
      });
  };
  const handleBack = () => {
    step === CreateOnBoardingSteps.NAME
      ? navigate(onboardingUrl)
      : setStep((stepToUpdate) => stepToUpdate - 1);
  };
  return {
    handleBack,
    handleBrandNext,
    handleBrandSkip,
    handleResumeNext,
    loading,
    handleNext,
    onBoardingDetails,
    step,
    name: currentUser?.name,
  };
};

export default useOnboarding;
