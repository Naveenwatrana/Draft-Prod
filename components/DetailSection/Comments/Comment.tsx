import { dateFormatDMY } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import { Avatar } from 'components/NavBar/styles';
import React from 'react';
import {
  Author, CommentContainer, CommentContent, PublishDate,
} from './style';

type CommentProp = {
  comment: string;
  author: string;
  profile?: string;
  date?: Date;
};

export const Comment = ({
  comment, author, profile, date, ...rest
}: CommentProp) => {
  return (
    <CommentContainer {...rest}>
      <Avatar
        rectangle={true}
        url={profile}
      >
        {!profile && author.charAt(0)}
      </Avatar>
      <span>
        <Author>{author}</Author>
        {date && (
          <PublishDate>
            {formatDate(date.toString(), dateFormatDMY)}
          </PublishDate>
        )}
        <CommentContent>{comment}</CommentContent>
      </span>
    </CommentContainer>
  );
};
