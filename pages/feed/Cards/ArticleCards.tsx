import React, { useCallback, useMemo } from 'react';
import DefaultCard from 'components/DefaultCard';
import CardStackCarousel from 'components/CardStack';
import { useNavigate } from 'common/utils/router-fill';
import { publishedDate } from 'common/utils/getPublishedDate';
import { articleUrl, loginUrl, postUrl } from 'common/utils/network/appRouts';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { PINS_TYPES } from 'common/types';
import { IFeedData } from '../types';
type CompanyCardsProps = {
  data: IFeedData;
  hideHeader?: boolean;
  onClick?: (param?: string) => void;
  withDate?: boolean;
  postCard?: boolean;
  height?: number;
  width?: number;
};

const ArticleCards = ({
  data, hideHeader, onClick, withDate = true, postCard, height, width,
}: CompanyCardsProps) => {
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  const { saveContent, isLoading } = useSaveContent();
  const saveJob = async (contentId: string) => {
    const contentType = postCard ? IInteractionItemTypes.posts : IInteractionItemTypes.articles;
    const pinType = postCard ? PINS_TYPES.POSTS : PINS_TYPES.ARTICLES;
    return saveContent(contentId, pinType, contentType);
  };
  const handleCardClick = useCallback((cardId?: string) => {
    if (onClick) {
      onClick(cardId);
      return;
    }
    if (loggedInUser) {
      navigate(postCard ? postUrl(Number(data?.id)) : articleUrl(Number(data?.id), data?.title as string));
      return;
    }
    navigate(loginUrl);
  }, [data, navigate, onClick, loggedInUser, postCard]);

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
          longText={card?.fields?.description}
          longTextTitle={card?.fields?.heading}
          links={card?.fields?.links}
          onClick={() => handleCardClick(card.id)}
          type={cardType}
          cover={card?.fields.media}
          hideHeader
          userId={data?.creator?.username}
          width={width ? `${width}px` : ''}
          height={height ? `${height}px` : ''}
        />
      );
    }) || [];
  }, [data, handleCardClick, withDate]);
  return (
    <CardStackCarousel
      slides={cards}
      cardType={data.type || 'article'}
      totalCardsinStack={data.cards?.length || 1}
      data={data}
      onSave={saveJob}
      isSaveLoading={isLoading}
      hideHeader={hideHeader || !loggedInUser}
      onClick={cards.length < 1 ? handleCardClick : undefined}
      userId={data?.id}
      width={width}
      height={height}
    />
  );
};

export default ArticleCards;
