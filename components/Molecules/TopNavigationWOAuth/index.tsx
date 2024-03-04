import Link from 'next/link';
import LogoIcon from 'components/Icons/icon';
import lang from 'common/lang';
import ButtonComp from 'components/buttonComp';
import { feedUrl, loginUrl, signUpUrl } from 'common/utils/network/appRouts';
import { useNavigate } from 'common/utils/router-fill';
import { Button, Buttons, Navbar } from './styles';

const { submitButtonLabel, signUpLink } = lang.SignIn;
const TopNavigationWithoutAuth = () => {
  const navigate = useNavigate();
  return (
    <Navbar>
      <Link href={feedUrl}><LogoIcon theme="light" /></Link>
      <Buttons>
        <ButtonComp variant="link" label={submitButtonLabel} onClick={() => navigate(loginUrl)} primary />
        <Button label={signUpLink} onClick={() => navigate(signUpUrl)} primary />
      </Buttons>
    </Navbar>
  );
};

export default TopNavigationWithoutAuth;
