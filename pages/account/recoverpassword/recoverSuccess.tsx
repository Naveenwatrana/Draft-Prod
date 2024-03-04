import TextComp from 'components/textComp';
import ButtonComp from 'components/buttonComp';
import { useNavigate } from 'common/utils/router-fill';
import lang from 'common/lang';
import { Instruction } from './styles';
import { IRecoverSuccessProps } from '../types';

const { RecoverPassword } = lang;

const RecoverSuccess = ({ email }: IRecoverSuccessProps) => {
  const navigate = useNavigate();
  return (
    <>
      <TextComp component="h2">{RecoverPassword.successTitle}</TextComp>
      <Instruction>
        <TextComp>
          {`If an account exists for ${email}, you will get an email with
            instructions on resetting your password. If it doesn't arrive, be
            sure to check your spam folder.`}
        </TextComp>
      </Instruction>
      <ButtonComp
        onClick={() => navigate('/account/signin')}
        label={RecoverPassword.loginLink}
        fullWidth
        primary
        data-cy="recover-success-login"
      />
    </>
  );
};

export default RecoverSuccess;
