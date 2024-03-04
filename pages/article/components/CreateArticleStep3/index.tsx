import Loader from 'components/Loader/Loader';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  articleApi,
  useCommentMutation,
  useCommentsQuery,
  useDeleteArticleMutation,
  useGetArticleQuery,
  usePublishArticleMutation,
  useUpvoteArticleMutation,
} from 'pages/article/articleService';
import { useParams, useNavigate } from 'common/utils/router-fill';
import htmlParser from 'html-react-parser';
import { showNotification } from 'pages/pro/components/Projects/util';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { formatCommentsData } from 'common/utils/helpers';
import { IComment, ICommentDataResponse } from 'components/Comments/types';
import useFollow from 'common/hooks/useFollow';
import AnimatedPage from 'components/AnimatedPage';
import { articleEditUrl, loginUrl } from 'common/utils/network/appRouts';
import { PreviewArticleProps } from 'pages/article/view/types';
import {
  IInteractionItemTypes, IInteractionTypes, IInteractorTypes, ISaveInteractionPayload,
} from 'common/services/Aladdin/types';
import DefaultCard from 'components/DefaultCard';
import { CONTENT_TYPE, PINS_TYPES } from 'common/types';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import DetailSection from 'components/DetailSection';
import useUpVote from 'pages/posts/view/useUpVote';
import DiscardConfirmation from 'components/Atoms/DiscardConfirmation';
import lang from 'common/lang';
import { highlightedText } from 'pages/article/util';
import InfoSection from '../InfoSection';
import ActionSection from '../ActionSection';
import {
  COMMENTER_TYPE, UPVOTER_TYPES, MODAL_TYPES_DATA,
} from './types';
import MoreLikeThis from '../MoreLikeThis';

const {
  article: {
    deleteModal: {
      title, subtitle, cancelButton, deleteButton, successMessage,
    },
  },
} = lang;

const CreateArticleStep3 = ({
  articleData, commentsData, moreLikeThisData, loggedInUser,
}: PreviewArticleProps) => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [skip, setSkip] = useState<boolean>(false);
  const [publishArticleApi, { isLoading }] = usePublishArticleMutation();
  const [deleteArticleApi, { isLoading: isDeleteArticleApiLoading }] = useDeleteArticleMutation();
  const [upvoteArticleApi] = useUpvoteArticleMutation();
  const { hasUserUpVoted } = useUpVote();

  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const currentUser = (useAppSelector(selectCurrentUser) || loggedInUser);
  const currentCompany = useAppSelector(selectCurrentCompany);
  const { data: apiData } = useGetArticleQuery({ id: articleData.data.id, companyUsername: currentCompany?.username }, { skip });
  const { followArticleUsers } = useFollow();
  const navigate = useNavigate();
  const [commentAddApi, addCommentResult] = useCommentMutation();
  const { saveContent, isLoading: pinArticleLoading } = useSaveContent();
  const { saveInteraction } = useAladdinInteraction();
  const data = (apiData || articleData);
  const { data: userComments } = useCommentsQuery(data.data.id, { skip });
  const comments: IComment[] = useMemo(
    () => (userComments || commentsData)?.data?.length ? (userComments || commentsData).data.map((commentData : ICommentDataResponse) => formatCommentsData(commentData)) : [],
    [commentsData, userComments],
  );

  const postComment = (comment: string) => {
    if (!currentUser) {
      navigate(loginUrl);
      return;
    }
    setSkip(false);
    const commenterCompany = currentCompany ? {
      commenter_id: currentCompany.id,
      commenter_type: COMMENTER_TYPE.COMPANIES,
    } : {};
    commentAddApi({
      comment,
      entity_type: 'articles',
      entity_id: id,
      ...commenterCompany,
    }).catch((error: any) => showNotification(error?.data?.message, NotificationType.ERROR));

    // Aladdin interaction event
    const eventDetail: ISaveInteractionPayload = {
      itemId: data.data.id,
      itemType: IInteractionItemTypes.articles,
      eventType: IInteractionTypes.comments,
      eventValue: 2,
    };
    saveInteraction(eventDetail);
    // Aladdin interaction event
  };

  const publish = async () => {
    const publishForCompany = currentCompany?.username ? { company: currentCompany?.username } : {};

    const postParam = params.id as string;
    const lastHyphen = postParam.lastIndexOf('-');
    const postId = postParam.substring(lastHyphen + 1);
    if (userIsAuthor) {
      await publishArticleApi({ id: postId, data: { publish: !publishDate, ...publishForCompany } }).unwrap();
    }
    navigate('/workspace');
  };
  useEffect(() => {
    if ((MODAL_TYPES_DATA.COMPANY === data?.data?.creator_type && data?.data?.creator_id === currentCompany?.id)
    || (MODAL_TYPES_DATA.USER === data?.data?.creator_type && data?.data?.creator_id === currentUser?.id && !currentCompany)) {
      setUserIsAuthor(true);
    }
  }, [currentUser, data?.data, currentCompany]);

  const followUser = async () => {
    if (!currentUser) {
      navigate(loginUrl);
    }
    await followArticleUsers(creator.id, !!isAuthorCompany);
  };

  const cardTypes = {
    cover: 'info',
    about: 'about',
    links: 'link',
  };
  const {
    content, creator, published_date: publishDate, id, saved, cards: articleCards, upvotes, tags, preview_image: previewImage,
  } = data.data;
  const isAuthorCompany = MODAL_TYPES_DATA.COMPANY === data?.data?.creator_type;
  const getCards = () => {
    return articleCards.map((card: any) => (
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
        withFollowButton={!userIsAuthor}
        userId={creator?.username}
        isAuthorCompany={isAuthorCompany}
        followUser={followUser}
        following={creator?.followed}
      />
    ));
  };
  const saveArticle = async (articleId: string) => {
    if (!currentUser) {
      navigate(loginUrl);
      return;
    }
    setSkip(false);
    saveContent(articleId, PINS_TYPES.ARTICLES, IInteractionItemTypes.articles);

    // Aladdin interaction event
    saveInteraction({
      itemId: articleId,
      itemType: IInteractionItemTypes.articles,
      eventType: IInteractionTypes.Save,
    });
    // Aladdin interaction event
  };
  const hasUserUpvoted = upvotes?.some((upvote: { upvoter_id: string; upvoter_type: string; }) => {
    if (currentCompany) {
      return upvote.upvoter_id === currentCompany?.id && upvote.upvoter_type === MODAL_TYPES_DATA.COMPANY;
    }
    return (upvote.upvoter_id === currentUser.id && upvote.upvoter_type === MODAL_TYPES_DATA.USER);
  });

  const handleUpvote = async () => {
    setSkip(false);
    if (!currentUser) {
      navigate(loginUrl);
      return;
    }
    const upvoter = currentCompany
      ? {
        upvoter_type: UPVOTER_TYPES.COMPANIES,
        upvoter_id: currentCompany.id,
      }
      : { upvoter_type: UPVOTER_TYPES.USERS, upvoter_id: currentUser.id };
    upvoteArticleApi({
      ...upvoter,
      upvotable_type: PINS_TYPES.ARTICLES,
      upvotable_id: id,
    });

    // Aladdin interaction event
    const eventDetail: ISaveInteractionPayload = {
      itemId: id,
      itemType: IInteractionItemTypes.articles,
      eventType: IInteractionTypes.Upvote,
    };
    if (currentCompany) {
      eventDetail.interactorType = IInteractorTypes.companies;
    }
    saveInteraction(eventDetail);
    // Aladdin interaction event
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = () => {
    deleteArticleApi(id).unwrap().then(() => {
      showNotification(successMessage, NotificationType.SUCCESS);
      dispatch(articleApi.util.invalidateTags(['articles']));
      router.replace('/');
    }).catch((error) => showNotification(error?.data?.message, NotificationType.ERROR));
  };

  const moreLikeThis = <MoreLikeThis data={moreLikeThisData} keyword={tags?.map((tag: { tag: string; }) => tag?.tag)?.join(',')} />;
  const firstCardImage = articleCards[0]?.fields?.media;
  const firstCardMantra = articleCards[0]?.fields?.mantra;
  const openDeleteConfirmation = () => setIsDeleteModalOpen(true);
  const closeDeleteConfirmation = () => setIsDeleteModalOpen(false);
  const onEdit = () => {
    navigate(articleEditUrl(id));
  };
  return (
    <>
      {(pinArticleLoading || isLoading || isDeleteArticleApiLoading) && <Loader data-cy="loader" />}
      {addCommentResult.isLoading && <Loader fullScreen />}
      {!isLoading && (
        <AnimatedPage
          cards={getCards()}
          moreLikeThis={moreLikeThis}
          info={<InfoSection authorIsCompany={MODAL_TYPES_DATA.COMPANY === data?.data?.creator_type} userIsAuthor={userIsAuthor} authorInfo={creator} publishInfo={publishDate} />}
          tags={data.data.tags}
          actions={(
            <ActionSection
              comments={comments}
              publishDate={publishDate}
              handleClick={publish}
              isAuthor={userIsAuthor}
              saveArticle={() => saveArticle(id)}
              postComment={postComment}
              handleUpvote={handleUpvote}
              upvoteCount={upvotes?.length}
              hasUserUpvoted={hasUserUpvoted}
              pinned={saved}
              disablePinButton={pinArticleLoading}
              articleId={id}
            />
          )}
          content={htmlParser(highlightedText(content))}
          title={data.data.title}
          previewImage={previewImage ?? firstCardImage}
          detailSection={data?.data && (
            <DetailSection
              hasUserUpVoted={hasUserUpVoted}
              handleUpVote={handleUpvote}
              data={{ ...data.data, caption: data.data.sub_title ?? firstCardMantra }}
              userIsAuthor={userIsAuthor}
              publish={publish}
              publishLoading={false}
              setSkip={setSkip}
              postId={data.data.id}
              withFollowButton={!userIsAuthor}
              comments={comments}
              commentsData={commentsData}
              contentType={CONTENT_TYPE.ARTICLES}
              pinType={PINS_TYPES.ARTICLES}
              onDelete={openDeleteConfirmation}
              itemType={IInteractionItemTypes.articles}
              onEdit={onEdit}
              {...data?.data?.caption ? { postCardData: data.data } : {}}
            />
          )}
        />
      )}
      <DiscardConfirmation
        closeModal={closeDeleteConfirmation}
        isOpen={isDeleteModalOpen}
        onDiscard={handleDelete}
        title={title}
        subtitle={subtitle}
        cancel={cancelButton}
        discard={deleteButton}
      />
    </>
  );
};

export default CreateArticleStep3;
