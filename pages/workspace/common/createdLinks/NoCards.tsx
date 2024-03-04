import lang from 'common/lang';
import { useNavigate } from 'common/utils/router-fill';
import NoJobIconImg from 'components/Icons/NoJob';
import {
  AddFirstJobText,
  AddJobButton,
  NoJobIcon,
  NoJobText,
  NoJobWrapper,
} from 'pages/workspace/common/styles';

const {
  posts: { noPostDesc, noPosts, createPosts },
} = lang;

const NotPosts = () => {
  const navigate = useNavigate();
  return (
    <NoJobWrapper>
      <NoJobIcon data-cy="no-job-icon">
        <NoJobIconImg />
      </NoJobIcon>
      <NoJobText data-cy="no-cards-title">No Links</NoJobText>
      <AddFirstJobText data-cy="no-cards-subtitle">
        You haven’t created any links yet.
      </AddFirstJobText>
      <AddJobButton
        data-cy="createPosts"
        onClick={() => navigate('/link/create')}
      >
        Create Links
      </AddJobButton>
    </NoJobWrapper>
  );
};

export default NotPosts;
