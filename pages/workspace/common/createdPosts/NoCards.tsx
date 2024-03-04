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
      <NoJobText data-cy="no-cards-title">{noPosts}</NoJobText>
      <AddFirstJobText data-cy="no-cards-subtitle">
        {noPostDesc}
      </AddFirstJobText>
      <AddJobButton
        data-cy="createPosts"
        onClick={() => navigate('/posts/create')}
      >
        {createPosts}
      </AddJobButton>
    </NoJobWrapper>
  );
};

export default NotPosts;
