import lang from 'common/lang';
import NoJobIconImg from 'components/Icons/NoJob';
import {
  AddFirstJobText,
  AddJobButton,
  NoJobIcon,
  NoJobText,
  NoJobWrapper,
} from 'pages/workspace/common/styles';

const {
  cronycleFeed: { loginLink, accessCronycle, linkAccountText },
} = lang;

const NotLinked = () => {
  return (
    <NoJobWrapper>
      <NoJobIcon data-cy="no-job-icon">
        <NoJobIconImg />
      </NoJobIcon>
      <NoJobText data-cy="no-job-title">{accessCronycle}</NoJobText>
      <AddFirstJobText data-cy="no-job-subtitle">{linkAccountText}</AddFirstJobText>
      <AddJobButton data-cy="addJobFromNoJob">{loginLink}</AddJobButton>
    </NoJobWrapper>
  );
};

export default NotLinked;
