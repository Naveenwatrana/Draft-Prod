import Loader from 'components/Loader/Loader';
import { useMemo } from 'react';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { formatCommentsData } from 'common/utils/helpers';
import { IComment, ICommentDataResponse } from 'components/Comments/types';
import DefaultCard from 'components/DefaultCard';
import ActionSection from 'pages/article/components/ActionSection';
import { cardTypes } from 'common/constants';
import useComments from 'common/hooks/useComments';
import InfoSection from 'pages/article/components/InfoSection';
import AnimatedPage from 'components/AnimatedPage';
import { MODAL_TYPES_DATA, CONTENT_TYPE } from 'common/types';
import { IUserCard } from 'pages/posts/types';
import useFollow from 'common/hooks/useFollow';
import {
  IInteractionItemTypes, IInteractionTypes, IInteractorTypes, ISaveInteractionPayload,
} from 'common/services/Aladdin/types';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { useRouter } from 'next/router';
import { ViewContentProps } from './types';

const ViewContent = ({
  hasUserUpVoted, handleUpVote, data, userIsAuthor, publish, publishLoading, postId, withFollowButton, tertiaryText, commentsData, contentType, pinType, itemType,
}: ViewContentProps) => {
  const { postCommentAPI, addCommentResult } = useComments();
  const { saveContent, isLoading: pinArticleLoading } = useSaveContent();
  const { followArticleUsers, followPostsUsers } = useFollow();
  const router = useRouter();
  const { saveInteraction } = useAladdinInteraction();
  const currentCompany = useAppSelector(selectCurrentCompany);

  const comments: IComment[] = useMemo(
    () => commentsData?.data?.length ? commentsData.data.map((commentData : ICommentDataResponse) => formatCommentsData(commentData)) : [],
    [commentsData],
  );

  const postComment = async (comment: string) => {
    await postCommentAPI(comment, postId, pinType);

    // Aladdin interaction event
    const eventDetail: ISaveInteractionPayload = {
      itemId: router.query.id as string,
      itemType: IInteractionItemTypes.posts,
      eventType: IInteractionTypes.comments,
    };
    if (currentCompany) {
      eventDetail.interactorType = IInteractorTypes.companies;
    }
    saveInteraction(eventDetail);
    // Aladdin interaction event
  };
  const saveArticle = async (articleId: string) => {
    return saveContent(articleId, pinType, itemType);
  };

  const isAuthorCompany = MODAL_TYPES_DATA.COMPANY === data?.creator_type;
  const {
    creator, published_date: publishDate, id, saved, cards: articleCards, upvotes,
  } = data;

  const followUser = async () => {
    if (contentType === CONTENT_TYPE.ARTICLES) {
      await followArticleUsers(creator.id, !!isAuthorCompany);
    }
    if (contentType === CONTENT_TYPE.POSTS) {
      await followPostsUsers(creator.id, !!isAuthorCompany);
    }
  };
  const getCards = () => {
    return articleCards.map((card: IUserCard) => (
      <DefaultCard
        key={card.id}
        type={cardTypes[card.type as keyof typeof cardTypes]}
        onClick={() => undefined}
        height="100%"
        width="100%"
        secondaryText={card?.fields?.mantra as string || ''}
        longText={card?.fields?.description as string || ''}
        longTextTitle={card?.fields?.heading as string || ''}
        links={card?.fields?.links}
        primaryText={creator?.name}
        cover={card?.fields?.media as string || ''}
        hideHeader
        withFollowButton={withFollowButton}
        tertiaryText={tertiaryText}
        userId={creator?.username}
        isAuthorCompany={isAuthorCompany}
        followUser={followUser}
        following={creator?.followed}
      />
    ));
  };
  const infoSection = <InfoSection authorIsCompany={isAuthorCompany} userIsAuthor={userIsAuthor} authorInfo={creator} publishInfo={publishDate} />;
  const actionsBar = (
    <ActionSection
      comments={comments}
      publishDate={publishDate}
      handleClick={publish}
      isAuthor={userIsAuthor}
      saveArticle={() => saveArticle(id)}
      postComment={postComment}
      handleUpvote={handleUpVote}
      upvoteCount={upvotes?.length}
      hasUserUpvoted={hasUserUpVoted(upvotes)}
      pinned={saved}
      disablePinButton={pinArticleLoading}
      articleId={id}
      itemType={IInteractionItemTypes.posts}
    />
  );
  return (
    <>
      {pinArticleLoading || publishLoading}
      {addCommentResult.isLoading && <Loader fullScreen />}
      {!publishLoading && (
        <AnimatedPage
          cards={getCards()}
          info={infoSection}
          actions={actionsBar}
          title=""
          previewImage={articleCards?.[0]?.fields?.media || ''}
        />
      )}
    </>
  );
};

export default ViewContent;
