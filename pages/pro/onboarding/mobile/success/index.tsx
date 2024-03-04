import { useEffect } from 'react';
import lang from 'common/lang';
import PlaceholderImage from 'public/images/defaultProfile.png';
import ButtonComp from 'components/buttonComp';
import ProfileCard from 'components/ProfileCard';
import Info from 'pages/pro/onboarding/common/cardSlides/info';
import Bio from 'pages/pro/onboarding/common/cardSlides/bio';
import Project from 'pages/pro/onboarding/common/cardSlides/project';
import { SuccessProps } from 'pages/pro/onboarding/mobile/success/types';
import { useNavigate } from 'common/utils/router-fill';
import { ButtonGroup, SkipButton } from '../styles';

const {
  onBoarding: { success },
} = lang;

const Success = ({ setTitle, setSubtitle, onBoardingData }: SuccessProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTitle(success.successTitle);
    setSubtitle(success.successSubtitle);
  }, []);

  const {
    fullName, mantra, image, bio, project,
  } = onBoardingData;

  const slides = [
    <Info
      key="infoSlide"
      image={image ? image : PlaceholderImage}
      mantra={mantra}
      fullName={fullName}
    />,
  ];

  if (bio) {
    slides.push(<Bio bio={bio} fullName={fullName} />);
  }

  if (project) {
    slides.push(<Project projects={project} fullName={fullName} />);
  }

  return (
    <>
      <ProfileCard slides={slides} showArrows={false} />
      <ButtonGroup>
        <ButtonComp label={success.primaryButton} fullWidth primary data-cy="explore-feed" onClick={() => navigate('/feed')} />
        <SkipButton
          label={success.secondaryButton}
          fullWidth
          data-cy="edit-profile"
          onClick={() => navigate('/profile')}
        />
      </ButtonGroup>
    </>
  );
};

export default Success;
