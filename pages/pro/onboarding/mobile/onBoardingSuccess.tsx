import ThumbsIcon from 'components/Icons/ThumbsIcon';
import lang from 'common/lang';
import styles from 'pages/profile/onboarding/mobile/mobileProfile.module.css';
import TextComp from 'components/textComp';
import { SubmitButton } from './styles';

const { onBoarding: { success } } = lang;

const OnBoardingSuccess = () => {
  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.thumbsIcon}>
          <ThumbsIcon />
        </div>
        <TextComp component="h2" theme="light">
          {success.successTitle}
        </TextComp>
        <TextComp component="h4" theme="light" className={styles.subtitle}>
          {success.successSubtitle}
        </TextComp>
      </div>
      <SubmitButton primary label="Explore Feed" fullWidth />
    </>
  );
};

export default OnBoardingSuccess;
