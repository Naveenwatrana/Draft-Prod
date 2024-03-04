import React, { useState } from 'react';
import { useNavigate } from 'common/utils/router-fill';
import { articleUrl, loginUrl } from 'common/utils/network/appRouts';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { PINS_TYPES } from 'common/types';
import { StyledDivider } from 'components/Divider/styles';
import UpvoteIcon from 'components/Icons/UpvoteIcon';
import CommentIcon from 'components/Icons/CommentIcon';
import SaveIcon from 'components/Icons/SaveIcon';
import {
  ArticalContainer, ArticalPreviewImage, ArticalTitleContainer, CreatorInfo, FeedTitle, FeedFooter, FeedAuthor,
  UpvoteWrapper, CommentsWrapper, CardIcon, IconWrapper, UserAvatar,
} from './style';
import { CompanyCardsProps } from './types';

const ArticleCard = ({
  data, hideHeader, onClick, withDate = true, postCard, height, width, clickable = true,
}: CompanyCardsProps) => {
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  const { saveContent, isLoading } = useSaveContent();
  const [saved, setSaved] = useState<boolean>(data?.saved || false);

  const handleCardClick = (cardId?: string) => {
    if (!clickable) return;
    if (onClick) {
      onClick(cardId);
      return;
    }
    if (loggedInUser) {
      navigate(articleUrl(Number(data?.id), data?.title as string));
      return;
    }
    navigate(loginUrl);
  };

  const saveArticle = (e:any, id: string) => {
    if (!clickable) return;
    e.stopPropagation();
    const contentType = IInteractionItemTypes.articles;
    const pinType = PINS_TYPES.ARTICLES;
    setSaved(!saved);
    return saveContent(id, pinType, contentType);
  };

  return (
    <ArticalContainer onClick={() => { handleCardClick(data.id.toString()); }} width={width}>
      {data?.preview_image && <ArticalPreviewImage style={{ width: width || 318, height: height || 320 }} src={data?.preview_image} alt={data?.preview_image} />}
      <CardIcon data-testid="cardIcon" data-cy="cardIcon">
        <IconWrapper onClick={(e) => { saveArticle(e, data.id.toString()); }} disabled={isLoading}>
          <SaveIcon size={16} active={saved} />
        </IconWrapper>
      </CardIcon>
      <ArticalTitleContainer>
        <FeedTitle title={data.title || ''}>{data.title || ''}</FeedTitle>
        <StyledDivider />
        <CreatorInfo>
          <FeedFooter>
            <UserAvatar
              rectangle={!(data.creator?.type === "Company")}
              url={data.creator?.type === "Company" ? data.creator?.logo : data.creator?.cards?.[0]?.fields?.media}
            >
              {!data.creator?.cards?.[0]?.fields?.media && data.creator?.name.charAt(0)}
            </UserAvatar>
            <FeedAuthor>{data?.creator?.name}</FeedAuthor>
            {/* TODO: finalize design and implement date */}
            {/* {data.created_at && <FeedDate>{formatDate(data.created_at, ARTICLE_DATE_FORMAT)}</FeedDate>} */}
          </FeedFooter>
          <FeedFooter>
            <UpvoteWrapper>
              <UpvoteIcon active={false} size={16} />
              {data?.upvotes_count && data?.upvotes_count > 1000 ? `${((data?.upvotes_count || 0) / 1000).toFixed(1)}k` : data?.upvotes_count }
            </UpvoteWrapper>
            <CommentsWrapper>
              <CommentIcon size={15} />
              {data?.comments_count && data?.comments_count > 1000 ? `${((data?.comments_count || 0) / 1000).toFixed(1)}k` : data?.comments_count }
            </CommentsWrapper>
          </FeedFooter>
        </CreatorInfo>
      </ArticalTitleContainer>
    </ArticalContainer>
  );
};

export default ArticleCard;
