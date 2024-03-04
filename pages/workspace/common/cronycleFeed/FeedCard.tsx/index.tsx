/* eslint-disable @next/next/no-img-element */
import { dateFormatDM, dateFormatDMY, URL_WWW } from 'common/constants';
import lang from 'common/lang';
import { formatDate } from 'common/utils/date/dateFormat';
import CardStack from 'components/Icons/CardStack';
import TextComp from 'components/textComp';
import { ICronycleFeedArticle } from 'pages/workspace/type';
import React from 'react';
import {
  CardContainer,
  ContentContainer,
  CoverImage,
  FeedAuthor,
  FeedDate,
  FeedInfo,
  FeedTitle,
  LabelText,
  StackContainer,
} from './style';
const {
  cronycleFeed: {
    labels,
  },
} = lang;
const filteredDomainName = (domain: string) => {
  if (domain.indexOf(URL_WWW) === 0) {
    return domain.slice(URL_WWW.length);
  }
  return domain;
};

export const FeedCard = (props: ICronycleFeedArticle) => {
  const {
    header, date, status, fetchDate, image, author, domain,
  } = props;
  return (
    <span>
      <CardContainer hidden={!status} href={props?.url as any} target="_blank" data-cy={`feedTitle${header}`}>
        <StackContainer>
          <CardStack />
          <TextComp component="h6">1</TextComp>
        </StackContainer>
        {image && (
          <CoverImage
            src={image}
            alt={image}
          />
        )}
        <FeedInfo>
          <FeedTitle title={header}>{header}</FeedTitle>
          <FeedDate>{formatDate(date.toString(), dateFormatDM)}</FeedDate>
          <FeedAuthor>{author || filteredDomainName(domain)}</FeedAuthor>
        </FeedInfo>
      </CardContainer>
      <ContentContainer>
        <div>
          <LabelText>{labels.fetchDate}</LabelText>
          <TextComp component="h6">
            {formatDate(fetchDate.toString(), dateFormatDMY)}
          </TextComp>
        </div>
      </ContentContainer>
    </span>
  );
};
