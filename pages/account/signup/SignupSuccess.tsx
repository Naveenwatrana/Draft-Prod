import ButtonComp from 'components/buttonComp';
import EmailSentIcon from 'components/Icons/SentEmail.svg';
import { useNavigate } from 'common/utils/router-fill';
import lang from 'common/lang';
import TextComp from 'components/textComp';
import { loginUrl } from 'common/utils/network/appRouts';
import { ContentWrapper, SignUpSuccessWrapper } from './styles';

const { SignUp, SignIn } = lang;

const SignUpSuccess = () => {
  const navigate = useNavigate();
  return (
    <SignUpSuccessWrapper>
      <EmailSentIcon />
      <TextComp component="h2">
        {SignUp.successTitle}
      </TextComp>
      <ContentWrapper>
        <TextComp component="h4">
          {SignUp.successMessage}
        </TextComp>
      </ContentWrapper>
      <ContentWrapper>
        <TextComp component="h4">
          {SignUp.verificationLinkExpiryMessage}
          <b>{SignUp.verificationLinkExpiryTime}</b>
        </TextComp>
      </ContentWrapper>
      <ButtonComp
        onClick={() => navigate(loginUrl)}
        primary
        label={SignIn.title}
        data-cy="signup-success-login"
        fullWidth
        variant="primary_gradient"
      />
    </SignUpSuccessWrapper>
  );
};
export default SignUpSuccess;
