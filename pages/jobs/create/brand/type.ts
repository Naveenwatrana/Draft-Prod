import { JobCoverCardFelids } from '../types';

export type OnboardingResumeProps = {
  onNext: () => void;
};

export type BrandProps = {
  coverCardData: JobCoverCardFelids;
};

export type BackgroundProps = {
  focused?: boolean;
};

export type AddCardProps = {
  centered?: boolean;
  height: number;
  width: number;
};
