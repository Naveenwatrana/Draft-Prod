import { ReactNode } from 'react';

export type FormHeaderProps = {
  totalSteps: number;
  currentStep: number;
  title: string;
  subtitle: string;
  back?: ReactNode;
  showStepper?: boolean;
};

export type IStepConfig = {
  content: JSX.Element;
  title: string;
  subtitle: string;
};
export type HeaderContainerProps = {
  back?: boolean;
};

export type IApiValues = {
  first_name: string;
  last_name: string;
  presigned_profile_cover: string;
  mantra: string;
  bio: string;
  onboarding_step: number;
};
