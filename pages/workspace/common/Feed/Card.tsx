import { dateFormatDMY } from 'common/constants';
import lang from 'common/lang';
import { formatDate } from 'common/utils/date/dateFormat';
import TextComp from 'components/textComp';
import { IMeltwaterFeedArticle } from 'pages/workspace/type';
import React from 'react';
import {
  ContentContainer,
  LabelText,
} from './style';
import { MeltwaterCardType } from './types';
import MeltwaterCard from './MeltwaterCard';
const {
  meltwater: { labels },
} = lang;

export const FeedCard = (props: IMeltwaterFeedArticle) => {
  const {
    header, date, status, fetchDate, image, author, domain, id,
  } = props;
  return (
    <span>
      <MeltwaterCard
        header={header}
        date={date}
        id={id}
        status={status}
        author={author}
        domain={domain}
        image={image}
        url={props?.url as string}
        cardType={MeltwaterCardType.horizontal}
      />
      <ContentContainer>
        <div>
          <LabelText>{labels.contentType}</LabelText>
          <TextComp component="h6">{props?.meltwater_type}</TextComp>
        </div>
        <div>
          <LabelText>{labels.fetchDate}</LabelText>
          {fetchDate
          && (
            <TextComp component="h6">
              {formatDate((fetchDate)?.toString(), dateFormatDMY)}
            </TextComp>
          )}
        </div>
      </ContentContainer>
    </span>
  );
};
