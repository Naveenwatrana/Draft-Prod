import CardStack from 'components/Icons/CardStack';
import SaveContent from 'components/Icons/SaveContent';
import TextComp from 'components/textComp';
import { useState } from 'react';
import {
  CardHeader,
  CardIcon,
  CardStackAction,
  CardStackActionDetail,
  CardStackIconContainer,
  CardStackIconWrapper,
  CardType,
  IconWrapper,
} from './styles';
import { CardStackHeaderProps } from './types';

const CardStackHeader = ({
  activeIndex,
  totalCardsinStack,
  cardStackType,
  isTouchDevice,
  data,
  onSave,
  isLoading,
  hideHeader = false,
}: CardStackHeaderProps) => {
  const [saved, setSaved] = useState<boolean>(data?.saved || false);

  const saveArticle = async (contentId: string) => {
    const previousState = saved;
    try {
      setSaved(!saved);
      await onSave(contentId);
    } catch (e) {
      setSaved(previousState);
    }
  };
  return (
    <CardHeader>
      <CardStackIconContainer>
        <CardStackIconWrapper
          data-testid="cardstackIconWrapper"
          data-cy="cardstackIconWrapper"
        >
          <CardStack />
          {!isTouchDevice && (
            <CardStackAction>{totalCardsinStack}</CardStackAction>
          )}
          <CardStackActionDetail show={isTouchDevice}>
            <TextComp>{`${activeIndex + 1}/${totalCardsinStack}`}</TextComp>
          </CardStackActionDetail>
        </CardStackIconWrapper>
      </CardStackIconContainer>
      <CardType show={isTouchDevice} data-cy="cardType">
        {cardStackType}
      </CardType>
      {!hideHeader && (
        <CardIcon show={isTouchDevice} data-testid="cardIcon" data-cy="cardIcon">
          <IconWrapper onClick={() => saveArticle(data.id)} disabled={isLoading}>
            <SaveContent size={18} active={saved} />
          </IconWrapper>
        </CardIcon>
      )}
    </CardHeader>
  );
};

export default CardStackHeader;
