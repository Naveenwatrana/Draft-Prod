import React, { useCallback, useMemo } from 'react';
import DefaultCard from 'components/DefaultCard';
import CardStackCarousel from 'components/CardStack';
import { useNavigate } from 'common/utils/router-fill';
import { PINS_TYPES } from 'common/types';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { formatDate } from 'common/utils/date/dateFormat';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { loginUrl, userProfileUrl } from 'common/utils/network/appRouts';
import { dateFormatDMY } from 'common/constants';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { IFeedData } from '../types';
type UserCardsProps = {
  data: IFeedData;
  clickable?: boolean;
  height?: number;
  width?: number;
  onClick?: () => void;
};

const UserCards = ({
  data, clickable = true, height, width, onClick,
}: UserCardsProps) => {
  const navigate = useNavigate();
  const { saveContent, isLoading } = useSaveContent();
  const loggedInUser = useLoggedInUser();
  const saveHandler = async (contentId: string) => {
    return saveContent(contentId, PINS_TYPES.USER, IInteractionItemTypes.users);
  };
  const handleCardClick = useCallback(() => {
    if (onClick) onClick();
    if (!clickable) return;
    if (loggedInUser && data.username) {
      navigate(userProfileUrl(data.username));
      return;
    }
    navigate(loginUrl);
  }, [clickable, loggedInUser, data.username, navigate]);

  const cards = useMemo(() => {
    return data.cards?.map((card) => {
      let cardType = card.type === 'cover' ? 'info' : 'about';
      cardType = card.type === 'links' ? 'link' : cardType;
      return (
        <DefaultCard
          key={card.id}
          primaryText={data?.name}
          secondaryText={card.fields?.mantra}
          tertiaryText={
            card.type !== 'cover' && card?.created_at && formatDate(card?.created_at, dateFormatDMY)
          }
          longText={card?.fields?.description}
          longTextTitle={card?.fields?.heading}
          links={card?.fields?.links}
          onClick={handleCardClick}
          type={cardType}
          cover={card?.fields.media}
          hideHeader
          userId={data?.username}
          width={width ? `${width}px` : ''}
          height={height ? `${height}px` : ''}
        />
      );
    }) || [
      <DefaultCard
        key={1}
        type="info"
        hideHeader={true}
        onClick={handleCardClick}
        userId={data.creator?.username}
        width={width ? `${width}px` : ''}
        height={height ? `${height}px` : ''}
      />,
    ];
  }, [data]);

  return (
    <CardStackCarousel
      slides={cards}
      cardType="person"
      totalCardsinStack={cards.length}
      data={data}
      onSave={saveHandler}
      isSaveLoading={isLoading}
      hideHeader={false}
      userId={data.id}
      width={width}
      height={height}
    />
  );
};

export default UserCards;
