import LogoIcon from 'components/Icons/icon';
import NotFoundIcon from 'components/Icons/404-icon.svg';
import lang from 'common/lang';
import { useNavigate } from 'common/utils/router-fill';
import ButtonComp from 'components/buttonComp';
import {
  NotFoundContainer, NotFoundDescription, NotFoundHeader, NotFoundSection, NotFoundTitle,
} from './404/styles';

const { errorMessages } = lang;

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <NotFoundHeader>
        <LogoIcon theme="light" />
      </NotFoundHeader>
      <NotFoundSection>
        <NotFoundIcon />
        <NotFoundTitle component="h2">Something is wrong</NotFoundTitle>
        <NotFoundDescription component="p">
          {errorMessages.notFound}
        </NotFoundDescription>
        <ButtonComp label="Go To Home Page" primary onClick={() => navigate('/')} />
      </NotFoundSection>
    </NotFoundContainer>
  );
};

export default NotFound;
