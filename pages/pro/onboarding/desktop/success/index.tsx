import ThumbsIcon from 'components/Icons/ThumbsIcon';
import TextComp from 'components/textComp';
import lang from 'common/lang';
import { useNavigate } from 'common/utils/router-fill';
import {
  ButtonGroup, ContentWrapper, SkipButton, SubmitButton, ThumbsIconWrapper,
} from './styles';

const {
  onBoarding: { success },
} = lang;

const OnboardingSuccess = () => {
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <ThumbsIconWrapper>
        <ThumbsIcon />
      </ThumbsIconWrapper>
      <TextComp component="h2" theme="light">
        {success.successTitle}
      </TextComp>
      <TextComp component="h4" theme="light">
        {success.successSubtitle}
      </TextComp>
      <ButtonGroup>
        <SkipButton
          label={success.secondaryButton}
          fullWidth
          data-cy="edit-profile"
          onClick={() => navigate('/profile')}
        />
        <SubmitButton
          primary
          label={success.primaryButton}
          onClick={() => navigate('/feed')}
          fullWidth
          data-cy="explore-feed"
        />
      </ButtonGroup>
    </ContentWrapper>
  );
};

export default OnboardingSuccess;
