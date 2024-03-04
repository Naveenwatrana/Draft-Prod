import { feedUrl } from 'common/utils/network/appRouts';
import { useNavigate } from 'common/utils/router-fill';
import ModalElement from 'components/Modal/Modal';
import { completeOnboarding } from 'pages/api/const';
import SuccessModal from 'pages/profile/onboarding/SuccessModal';
import React, { useState } from 'react';
import { OnboardSuccessProps } from './types';

const OnboardSuccess = ({ newlyOnboarded }: OnboardSuccessProps) => {
  const navigate = useNavigate();
  const [onboarded, setOnboarded] = useState<boolean>(!!newlyOnboarded);

  const goToFeed = () => {
    fetch(completeOnboarding).then(() => {
      navigate(feedUrl);
    });
  };

  const handleCompleteOnboarding = () => {
    fetch(completeOnboarding).then(() => {
      setOnboarded(false);
    });
  };
  return (
    <ModalElement
      isOpen={onboarded}
      centered
      position={2}
      shouldCloseOnOverlayClick
    >
      <SuccessModal onCancel={goToFeed} onSuccess={handleCompleteOnboarding} />
    </ModalElement>
  );
};

export default OnboardSuccess;
