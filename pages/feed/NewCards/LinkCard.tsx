import React from 'react';
import { useNavigate } from 'common/utils/router-fill';
import { loginUrl } from 'common/utils/network/appRouts';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { StyledDivider } from 'components/Divider/styles';
import UpvoteIcon from 'components/Icons/UpvoteIcon';
import CommentIcon from 'components/Icons/CommentIcon';
import { extractWebsiteName } from 'pages/api/link/utils';
import {
  LinkContainer, ArticalTitleContainer, CreatorInfo, FeedTitle, FeedFooter, FeedAuthor,
  UpvoteWrapper, CommentsWrapper, UserAvatar, LinkPreviewImage, WebsiteLink,
} from './style';
import { CompanyCardsProps } from './types';
import { formatWebsiteName } from '../util';

const LinkCard = ({
  data, onClick, width,
}: CompanyCardsProps) => {
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();

  const handleCardClick = (cardId?: string) => {
    if (onClick) {
      onClick(cardId);
      return;
    }
    if (loggedInUser) {
      navigate(`/link/view/${data.id}`);
      return;
    }
    navigate(loginUrl);
  };
  return (
    <LinkContainer width={width} onClick={() => { handleCardClick(data.id.toString()); }}>
      {data?.og_image && <LinkPreviewImage style={{ width: width || 318 }} src={data?.og_image} alt={data?.og_image} />}
      <ArticalTitleContainer>
        {data.website_name && <WebsiteLink title={data.website_name || ''}>{formatWebsiteName(data.website_name) || ''}</WebsiteLink>}
        {!data.website_name && data.link && <WebsiteLink title={data.link || ''}>{extractWebsiteName(data.link)}</WebsiteLink>}
        <FeedTitle title={data.og_title || ''}>{data.og_title || ''}</FeedTitle>
        <StyledDivider />
        <CreatorInfo>
          <FeedFooter>
            <UserAvatar
              rectangle={!(data.creator?.type === "Company")}
              url={data.creator?.type === "Company" ? data.creator?.logo : data.creator?.cards?.[0]?.fields?.media}
            >
              {!data.creator?.cards?.[0]?.fields?.media && data.creator?.name.charAt(0)}
            </UserAvatar>
            <FeedAuthor>{data?.creator?.name || 'Anonymous'}</FeedAuthor>
            {/* TODO: finalize design and implement date */}
            {/* {data.created_at && <FeedDate>{formatDate(data.created_at, ARTICLE_DATE_FORMAT)}</FeedDate>} */}
          </FeedFooter>
          <FeedFooter>
            <UpvoteWrapper>
              <UpvoteIcon active={false} size={16} />
              {data?.upvotes_count && data?.upvotes_count > 1000 ? `${((data?.upvotes_count || 0) / 1000).toFixed(1)}k` : (data?.upvotes_count || 0)}
            </UpvoteWrapper>
            <CommentsWrapper>
              <CommentIcon size={15} />
              {data?.comments_count && data?.comments_count > 1000 ? `${((data?.comments_count || 0) / 1000).toFixed(1)}k` : (data?.comments_count || 0) }
            </CommentsWrapper>
          </FeedFooter>
        </CreatorInfo>
      </ArticalTitleContainer>
    </LinkContainer>
  );
};

export default LinkCard;
