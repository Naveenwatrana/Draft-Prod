import React from 'react';
import { ARTICLE_DATE_FORMAT } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import { StyledDivider } from 'components/Divider/styles';
import ArrowUp from 'components/Icons/ArrowUp';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import {
  CoverImage,
  FeedAuthor,
  FeedDate,
  FeedFooter,
  FeedInfo,
  FeedTitle,
  StaticCardContainer,
} from './style';
import { MeltwaterCardProps } from './types';
import { filteredDomainName } from './util';

const MeltwaterCard = ({
  status,
  header,
  image,
  domain,
  author,
  date,
  cardType,
  clickable = true,
  id,
}: MeltwaterCardProps) => {
  const { saveInteraction } = useAladdinInteraction();
  const SaveUserInteraction = () => {
    if (!clickable) return;
    saveInteraction({
      itemId: `${id}`, itemType: IInteractionItemTypes.articles, eventType: IInteractionTypes.ViewPage, eventValue: IInteractionEventValueType.brandTab,
    });
  };
  return (
    <StaticCardContainer
      hidden={!status}
      data-cy={`feedTitle${header}`}
      cardType={cardType}
      withoutImage={!image}
      onClick={SaveUserInteraction}
    >
      {image && <CoverImage src={image} alt={image} />}
      <FeedInfo>
        <FeedTitle title={header}>{header}</FeedTitle>
        <StyledDivider />
        <FeedFooter>
          <FeedAuthor>{author || filteredDomainName(domain)}</FeedAuthor>
          {date && <FeedDate>{formatDate(date?.toString(), ARTICLE_DATE_FORMAT)}</FeedDate>}
          <ArrowUp />
        </FeedFooter>
      </FeedInfo>
    </StaticCardContainer>
  );
};

export default MeltwaterCard;
