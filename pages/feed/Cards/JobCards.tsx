import React, { useCallback, useMemo } from 'react';
import DefaultCard from 'components/DefaultCard';
import { useSaveContent } from 'common/hooks/useSaveContent';
import CardStackCarousel from 'components/CardStack';
import { PINS_TYPES } from 'common/types';
import { jobDetailsUrl, loginUrl } from 'common/utils/network/appRouts';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { useNavigate } from 'common/utils/router-fill';
import { IFeedData } from '../types';
type JobCardsProps = {
  data: IFeedData;
  height?: number;
  width?: number;
  onClick?: () => void;
  clickable?: boolean;
};

const JobCards = ({
  data, width, height, onClick, clickable = true,
}: JobCardsProps) => {
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  const { saveContent, isLoading } = useSaveContent();
  const saveJob = async (contentId: string) => {
    return saveContent(contentId, PINS_TYPES.JOBS, IInteractionItemTypes.jobs);
  };
  const handleCardClick = useCallback(() => {
    if (onClick) onClick();
    if (!clickable) return;
    if (loggedInUser && data?.id) {
      navigate(data?.slug ? `/${data?.slug}` : jobDetailsUrl(Number(data?.id)));
      return;
    }
    navigate(loginUrl);
  }, [onClick, clickable, loggedInUser, navigate, data?.id]);

  const cards = useMemo(() => {
    if (data?.cards?.length) {
      return data.cards?.map((card) => {
        let cardType = card.type === 'cover' ? 'info' : 'about';
        cardType = card.type === 'links' ? 'link' : cardType;
        if (cardType === 'info') {
          return (
            <DefaultCard
              icon={data?.company?.logo}
              primaryText={data.company?.name}
              secondaryText={data.title}
              tertiaryText={data.employment_type}
              tertiaryPairText={[data.location_type, data.location] as [string, string]}
              type="job"
              range={{
                from: data.salary_from || 0,
                to: data.salary_to || 0,
              }}
              onClick={handleCardClick}
              width={width ? `${width}px` : ''}
              height={height ? `${height}px` : ''}
              cover={card.fields.media}
              hideHeader
              userNameClickable={false}
              key={data.logo}
            />
          );
        }
        return (
          <DefaultCard
            key={card.id}
            secondaryText={card.fields?.mantra}
            longText={card?.fields?.description}
            longTextTitle={card?.fields?.heading}
            primaryText={data.name}
            links={card?.fields?.links}
            onClick={handleCardClick}
            type={cardType}
            cover={card?.fields.media}
            hideHeader
            userId={data?.creator?.username}
            icon={data.logo}
            width={width ? `${width}px` : ''}
            height={height ? `${height}px` : ''}
          />
        );
      });
    } else {
      return [
        <DefaultCard
          key={1}
          secondaryText={data?.bio}
          type="info"
          cover={data?.cover}
          icon={data?.logo}
          hideHeader={true}
          onClick={handleCardClick}
          userId={data.creator?.username}
          width={width ? `${width}px` : ''}
          height={height ? `${height}px` : ''}
        />,
      ];
    }
  }, [data, handleCardClick]);

  return (
    <CardStackCarousel
      slides={cards}
      cardType="job"
      totalCardsinStack={cards.length}
      data={data}
      onSave={saveJob}
      isSaveLoading={isLoading}
      hideHeader={!loggedInUser}
      height={height}
      width={width}
    />
  );
};

export default JobCards;
