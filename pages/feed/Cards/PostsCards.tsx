import React, { useCallback, useMemo } from 'react';
import DefaultCard from 'components/DefaultCard';
import CardStackCarousel from 'components/CardStack';
import { useNavigate } from 'common/utils/router-fill';
import { publishedDate } from 'common/utils/getPublishedDate';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { PINS_TYPES } from 'common/types';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { loginUrl, postUrl } from 'common/utils/network/appRouts';
import { IFeedData } from '../types';
type PostCardsProps = {
  data: IFeedData;
  hideHeader?: boolean;
  onClick?: (param?: string) => void;
  withDate?: boolean;
};

const PostsCards = ({
  data, hideHeader, onClick, withDate = true,
}: PostCardsProps) => {
  const navigate = useNavigate();
  const { saveContent, isLoading } = useSaveContent();
  const loggedInUser = useLoggedInUser();
  const saveJob = async (contentId: string) => {
    return saveContent(contentId, PINS_TYPES.ARTICLES, IInteractionItemTypes.posts);
  };
  const handleCardClick = useCallback((cardId?: string) => {
    if (!loggedInUser) {
      navigate(loginUrl);
      return;
    }
    if (onClick) {
      onClick(cardId);
    } else {
      navigate(postUrl(parseInt(data?.id)));
    }
  }, [data, navigate, onClick, loggedInUser]);

  const cards = useMemo(() => {
    return data.cards?.map((card) => {
      let cardType = card.type === 'cover' ? 'info' : 'about';
      cardType = card.type === 'links' ? 'link' : cardType;
      return (
        <DefaultCard
          key={card.id}
          primaryText={data?.creator?.name}
          secondaryText={card.fields?.mantra}
          tertiaryText={publishedDate(card?.created_at, withDate)}
          longText={card?.fields?.mantra}
          longTextTitle={card?.fields?.heading}
          links={card?.fields?.links}
          onClick={() => handleCardClick(card.id)}
          type={cardType}
          cover={card?.fields.media}
          hideHeader
          userId={data?.creator?.username}
        />
      );
    }) || [];
  }, [data, handleCardClick, withDate]);
  return (
    <CardStackCarousel
      slides={cards}
      cardType={data.type || 'posts'}
      totalCardsinStack={data.cards?.length || 1}
      data={data}
      onSave={saveJob}
      isSaveLoading={isLoading}
      hideHeader={hideHeader}
      onClick={cards.length < 1 ? handleCardClick : undefined}
    />
  );
};

export default PostsCards;
