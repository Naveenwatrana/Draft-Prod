import { jobDateFormat } from 'common/constants';
import lang from 'common/lang';
import { formatDate } from 'common/utils/date/dateFormat';
import DefaultProfile from 'components/Icons/DefaultProfile';
import Image from 'next/image';
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

const {
  comments: { published },
} = lang;

export const Comment = ({
  comment, author, profile, date, ...rest
}: CommentProp) => {
  return (
    <CommentContainer {...rest}>
      {profile ? (
        <Image src={profile} width={59.21} height={61.64} alt="profile-image" />
      ) : (
        <DefaultProfile width={59.21} height={61.64} />
      )}
      <span>
        <Author>{author}</Author>
        <CommentContent>{comment}</CommentContent>
        {date && (
          <PublishDate>
            {published}
            :
            {' '}
            {formatDate(date.toString(), jobDateFormat)}
          </PublishDate>
        )}
      </span>
    </CommentContainer>
  );
};
