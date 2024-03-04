import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import { useNavigate } from 'common/utils/router-fill';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { useEffect, useMemo, useState } from 'react';
import ViewContentV2 from 'components/Molecules/ViewContent/v2/ViewContent';
import usePosts from 'common/hooks/usePosts';
import { CONTENT_TYPE, MODAL_TYPES_DATA, PINS_TYPES } from 'common/types';
import { useAppSelector } from 'common/hooks/state';
import Loader from 'components/Loader/Loader';
import DetailSection from 'components/DetailSection';
import { formatDate } from 'common/utils/date/dateFormat';
import { useRouter } from 'next/router';
import {
  IInteractionEventValueType,
  IInteractionItemTypes, IInteractionTypes, IInteractorTypes, ISaveInteractionPayload,
} from 'common/services/Aladdin/types';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { dateFormatDM } from 'common/constants';
import { ToastContainer } from 'react-toastify';
import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { showNotification } from 'pages/pro/components/Projects/util';
import lang from 'common/lang';
import DiscardConfirmation from 'components/Atoms/DiscardConfirmation';
import useUpVote from './view/useUpVote';
import { useViewCommentsQuery, useViewPostQuery } from './postsService';
import { PageContainer } from './view/styles';
import { mapOldPost } from './util';
const {
  posts: {
    successMessage, deleteModal: {
      title, subtitle, deleteButton, cancelButton,
    },
  },
} = lang;
const ViewPosts = () => {
  useHandleMissingSession();
  const { handleUpVoteAPI, hasUserUpVoted } = useUpVote();
  const {
    publishApi, publishLoading, handleDelete, isLoading,
  } = usePosts();
  const router = useRouter();
  const navigate = useNavigate();
  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { saveInteraction } = useAladdinInteraction();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentCompany = useAppSelector(selectCurrentCompany);

  const { data, isLoading: loading, isError } = useViewPostQuery({ id: router.query.id, companyUsername: currentCompany?.username }, { skip: !router.isReady });
  const { data: commentsData } = useViewCommentsQuery(router.query.id, { skip: !router.isReady });

  // Aladdin interaction event
  useEffect(() => {
    if (router.query.id) {
      saveInteraction({
        itemId: router.query.id as string,
        itemType: IInteractionItemTypes.posts,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.brandTab,
      });
    }
  }, [
    router.query.id,
  ]);
  useEffect(() => {
    if (router.query?.created) {
      showNotification(successMessage, NotificationType.SUCCESS);
    }
  }, [router.query?.created, data?.data?.id]);
  // Aladdin interaction event
  const handleUpVote = async () => {
    handleUpVoteAPI((router.query.id as string), PINS_TYPES.POSTS);

    // Aladdin interaction event
    const eventDetail: ISaveInteractionPayload = {
      itemId: router.query.id as string,
      itemType: IInteractionItemTypes.posts,
      eventType: IInteractionTypes.Upvote,
    };
    if (currentCompany) {
      eventDetail.interactorType = IInteractorTypes.companies;
    }
    saveInteraction(eventDetail);
    // Aladdin interaction event
  };

  const publish = async () => {
    await publishApi(userIsAuthor, (router.query.id as string), data?.data?.published_date ? { publish: 0 } : { publish: 1 });
    navigate('/workspace');
  };

  useEffect(() => {
    if ((MODAL_TYPES_DATA.COMPANY === data?.data?.creator_type && data?.data?.creator_id === currentCompany?.id)
    || (MODAL_TYPES_DATA.USER === data?.data?.creator_type && data?.data?.creator_id === currentUser?.id && !currentCompany)) {
      setUserIsAuthor(true);
    }
  }, [currentUser, data?.data, currentCompany]);

  const publishedDate = data?.data?.published_date ? formatDate(data?.data?.published_date, dateFormatDM) : '';
  const postCardData = useMemo(() => {
    if (data?.data) {
      return data?.data?.caption
        ? data?.data
        : { ...data?.data, ...mapOldPost(data?.data) };
    }
  }, [data?.data]);
  if (loading) {
    return <Loader data-cy="loader" />;
  }
  if (isError) {
    navigate('/404');
  }
  return (
    <LayoutWithNavbar>
      {isLoading && <Loader />}
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {data?.data && (
        <PageContainer>
          <ViewContentV2 postCardData={postCardData} />
          <DetailSection
            hasUserUpVoted={hasUserUpVoted}
            handleUpVote={handleUpVote}
            data={postCardData}
            userIsAuthor={userIsAuthor}
            publish={publish}
            publishLoading={publishLoading}
            postId={router.query.id as string}
            withFollowButton={!userIsAuthor}
            tertiaryText={publishedDate}
            commentsData={commentsData}
            contentType={CONTENT_TYPE.POSTS}
            pinType={PINS_TYPES.POSTS}
            itemType={IInteractionItemTypes.posts}
            onDelete={() => setIsDeleteModalOpen(true)}
            {...data?.data?.caption ? { postCardData: data.data } : {}}
          />
        </PageContainer>
      )}
      <DiscardConfirmation
        closeModal={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}
        onDiscard={() => handleDelete(data.data.id)}
        title={title}
        subtitle={subtitle}
        cancel={cancelButton}
        discard={deleteButton}
      />
    </LayoutWithNavbar>
  );
};

export default ViewPosts;
