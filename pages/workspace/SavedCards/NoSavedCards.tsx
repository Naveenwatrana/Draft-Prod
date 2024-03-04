import lang from 'common/lang';
import { useNavigate } from 'common/utils/router-fill';
import NoJobIconImg from 'components/Icons/NoJob';
import {
  AddFirstJobText,
  NoJobIcon,
  NoJobText,
  NoJobWrapper,
} from 'pages/workspace/common/styles';
import { GoToFeedButton } from './styles';

const {
  savedCards: { noCardDesc, noCards, createCards },
} = lang;

const NoSavedCards = () => {
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
      <GoToFeedButton
        data-cy="createCards"
        onClick={() => navigate('/feed')}
        label={createCards}
        primary
      />

    </NoJobWrapper>
  );
};

export default NoSavedCards;
