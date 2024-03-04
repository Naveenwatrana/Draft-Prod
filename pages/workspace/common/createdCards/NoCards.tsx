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
  cards: { noCardDesc, noCards, createCards },
} = lang;

const NotCards = () => {
  const navigate = useNavigate();
  return (
    <NoJobWrapper>
      <NoJobIcon data-cy="no-job-icon">
        <NoJobIconImg />
      </NoJobIcon>
      <NoJobText data-cy="no-cards-title">{noCards}</NoJobText>
      <AddFirstJobText data-cy="no-cards-subtitle">
        {noCardDesc}
      </AddFirstJobText>
      <AddJobButton
        data-cy="createCards"
        onClick={() => navigate('/article/create')}
      >
        {createCards}
      </AddJobButton>
    </NoJobWrapper>
  );
};

export default NotCards;
