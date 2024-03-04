export const CARD_WIZARD_FEATURE_FLAG = 'card-wizard';

const featureStatus = {
  [CARD_WIZARD_FEATURE_FLAG]: true,
};

export const getFeatureStatus = (featureName: string): boolean => {
  if (typeof window !== 'undefined' && !window.location.href.includes("draft-prod")) {
    return true;
  }
  return featureStatus[featureName as keyof typeof featureStatus];
};
