import React, { useState } from 'react';
import { useNavigate } from 'common/utils/router-fill';
import { loginUrl, postUrl } from 'common/utils/network/appRouts';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { PINS_TYPES } from 'common/types';
import { StyledDivider } from 'components/Divider/styles';
import UpvoteIcon from 'components/Icons/UpvoteIcon';
import CommentIcon from 'components/Icons/CommentIcon';
import SaveIcon from 'components/Icons/SaveIcon';
import Video from 'components/VideoPlayer';
import { removeURLSpace } from 'components/CardCreationWizard/components/CardFields/utils';
import {
  PostContainer, PostPreviewImage, ArticalTitleContainer, CreatorInfo, FeedFooter, FeedAuthor, CountWrapper,
  UpvoteWrapper, CommentsWrapper, CardIcon, IconWrapper, VideoContainer, PostCaption, UserAvatar, CountContainer,
} from './style';
import { CompanyCardsProps } from './types';

const PostCard = ({
  data, hideHeader, onClick, withDate = true, postCard, height, width,
}: CompanyCardsProps) => {
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  const { saveContent, isLoading } = useSaveContent();
  const [saved, setSaved] = useState<boolean>(data?.saved || false);

  const handleCardClick = (cardId?: string) => {
    if (onClick) {
      onClick(cardId);
      return;
    }
    if (loggedInUser) {
      navigate(postUrl(Number(data?.id)));
      return;
    }
    navigate(loginUrl);
  };

  const saveArticle = (e:any, id: string) => {
    e.stopPropagation();
    const contentType = IInteractionItemTypes.posts;
    const pinType = PINS_TYPES.POSTS;
    setSaved(!saved);
    return saveContent(id, pinType, contentType);
  };
  const isVideo = (['mp4', 'MOV', '.mov', '.MP4'].some((url) => (data?.media && data?.media[0] ? data.media[0] : '').includes(url)) && data?.media && data?.media[0]);
  return (
    <PostContainer onClick={() => { handleCardClick(data.id.toString()); }} width={width}>
      {data?.media && data?.media[0] && !isVideo && <PostPreviewImage style={{ width: width || 318 }} src={data?.media[0]} alt={data?.media[0]} />}
      {data?.media && data?.media[0] && isVideo && (
        <VideoContainer>
          <Video media={removeURLSpace(data?.media[0])} mute={true} />
        </VideoContainer>
      )}
      <CountContainer data-testid="cardIcon" data-cy="cardIcon">
        <CountWrapper>
          {`1/${data?.media?.length}`}
        </CountWrapper>
      </CountContainer>
      <CardIcon data-testid="cardIcon" data-cy="cardIcon">
        <IconWrapper onClick={(e) => { saveArticle(e, data.id.toString()); }} disabled={isLoading}>
          <SaveIcon size={16} active={saved} />
        </IconWrapper>
      </CardIcon>
      <ArticalTitleContainer>
        {data?.caption && <PostCaption title={data?.caption || ''}>{data?.caption || ''}</PostCaption>}
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
    </PostContainer>
  );
};

export default PostCard;
