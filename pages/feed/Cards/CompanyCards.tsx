import React, { useMemo } from 'react';
import DefaultCard from 'components/DefaultCard';
import CardStackCarousel from 'components/CardStack';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { PINS_TYPES } from 'common/types';
import { IFeedData } from '../types';
type CompanyCardsProps = {
  data: IFeedData;
  hideHeader?: boolean;
  onClick?: () => void;
  height?: number;
  width?: number;
};

const CompanyCards = ({
  data, hideHeader, onClick, height, width,
}: CompanyCardsProps) => {
  const { saveContent, isLoading } = useSaveContent();
  const saveJob = async (contentId: string) => {
    return saveContent(contentId, PINS_TYPES.COMPANIES, IInteractionItemTypes.companies);
  };
  const cards = useMemo(() => {
    if (data?.cards?.length) {
      return data.cards?.map((card) => {
        let cardType = card.type === 'cover' ? 'info' : 'about';
        cardType = card.type === 'links' ? 'link' : cardType;
        return (
          <DefaultCard
            key={card.id}
            secondaryText={card.fields?.mantra}
            longText={card?.fields?.description}
            longTextTitle={card?.fields?.heading}
            primaryText={data.name}
            links={card?.fields?.links}
            onClick={onClick}
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
          hideHeader={hideHeader}
          onClick={onClick}
          userId={data.creator?.username}
          width={width ? `${width}px` : ''}
          height={height ? `${height}px` : ''}
        />,
      ];
    }
  }, [data, hideHeader, onClick]);

  return (
    <CardStackCarousel
      slides={cards}
      cardType="company"
      totalCardsinStack={cards.length}
      data={data}
      onSave={saveJob}
      isSaveLoading={isLoading}
      hideHeader={false}
      width={width}
      height={height}
    />
  );
};

export default CompanyCards;
