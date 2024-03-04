import ArticleCards from 'pages/feed/Cards/ArticleCards';
import { IconContainer, IconsContainer } from 'pages/pro/styles';
import PencilIcon from 'components/Icons/PencilIcon';
import { useAppSelector } from 'common/hooks/state';
import { getIsCurrentUser } from 'pages/pro/profileSlice';
import { BasicDetailsContainer } from '../styles';
import { UserProfileDeckProps } from './types';

const UserProfileDeck = ({ data, setEditImageDetail, onCardClick }: UserProfileDeckProps) => {
  const isCurrentUser = useAppSelector(getIsCurrentUser);
  return (
    <BasicDetailsContainer>
      <ArticleCards
        data={{ cards: data?.cards, type: 'person', id: data?.id }}
        key={`SavedCard${data?.id}`}
        data-cy="profileDeckCard"
        hideHeader
        onClick={onCardClick}
        withDate={false}
      />
      {isCurrentUser && (
        <IconsContainer data-cy="profileCardEditButton" onClick={() => setEditImageDetail(true)}>
          <IconContainer contained>
            <PencilIcon size={16} />
          </IconContainer>
        </IconsContainer>
      )}
    </BasicDetailsContainer>
  );
};

export default UserProfileDeck;
