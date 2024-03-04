import lang from 'common/lang';
import {
  AddFirstJobText,
  NoJobIcon,
  NoJobText,
  NoJobWrapper,
} from 'pages/workspace/common/styles';
import SearchPeopleIcon from 'components/Icons/SearchPeople';

const {
  feed: { noResultFor, noResultMessage },
} = lang;

const NoFeedFound = ({ searchTerm }: { searchTerm: string }) => {
  return (
    <NoJobWrapper>
      <NoJobIcon data-cy="no-job-icon">
        <SearchPeopleIcon />
      </NoJobIcon>
      <NoJobText data-cy="no-job-title">
        {`${noResultFor}"${searchTerm}"`}
      </NoJobText>
      <AddFirstJobText data-cy="no-job-subtitle">
        {noResultMessage}
      </AddFirstJobText>
    </NoJobWrapper>
  );
};

export default NoFeedFound;
