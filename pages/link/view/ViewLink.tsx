import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import { ToastContainer } from 'react-toastify';
import {
  CONTENT_TYPE, MODAL_TYPES_DATA, PINS_TYPES,
} from 'common/types';
import DetailSection from 'components/DetailSection';
import { useRouter } from 'next/router';
import {
  IInteractionItemTypes, IInteractionTypes, IInteractorTypes, ISaveInteractionPayload,
} from 'common/services/Aladdin/types';
import ArrowUp from 'components/Icons/ArrowUp';
import TextComp from 'components/textComp';
import Link from 'next/link';
import { extractWebsiteName } from 'pages/api/link/utils';
import Loader from 'components/Loader/Loader';
import { useEffect, useMemo, useState } from 'react';
import { IComment, ICommentDataResponse } from 'components/Comments/types';
import { formatCommentsData } from 'common/utils/helpers';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import useUpVote from 'pages/posts/view/useUpVote';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import {
  Content, MainContent, Wrapper, ImageComponent, WebsiteLink, Title,
} from './styles';
import { ViewShareLinkPageProps } from './types';
import { useGetLinkQuery, useLinkCommentsQuery } from '../create/LinkService';

const ViewShareLinkPage = ({ loggedInUser, commentsData }: ViewShareLinkPageProps) => {
  const [skip, setSkip] = useState<boolean>(false);
  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const currentUser = (useAppSelector(selectCurrentUser) || loggedInUser);
  const currentCompany = useAppSelector(selectCurrentCompany);
  const { handleUpVoteAPI, hasUserUpVoted } = useUpVote();
  const { saveInteraction } = useAladdinInteraction();
  const router = useRouter();
  const publish = () => undefined; // TODO: API to be built
  const publishLoading = false; // TODO: API to be built
  const publishedDate = ''; // TODO: API to be built
  const { data: apiData, isLoading } = useGetLinkQuery({ id: router.query.id as string }, { skip });
  const { data: userComments } = useLinkCommentsQuery(router.query.id, { skip });
  const comments: IComment[] = useMemo(
    () => (userComments || commentsData)?.data?.length ? (userComments || commentsData).data.map((commentData : ICommentDataResponse) => formatCommentsData(commentData)) : [],
    [commentsData, userComments],
  );

  const handleUpVote = async () => {
    handleUpVoteAPI((router.query.id as string), PINS_TYPES.LINKS);
    const eventDetail: ISaveInteractionPayload = {
      itemId: router.query.id as string,
      itemType: IInteractionItemTypes.links,
      eventType: IInteractionTypes.Upvote,
    };
    if (currentCompany) {
      eventDetail.interactorType = IInteractorTypes.companies;
    }
    saveInteraction(eventDetail);
  };

  useEffect(() => {
    if ((MODAL_TYPES_DATA.COMPANY === apiData?.data?.creator_type && apiData?.data?.creator_id === currentCompany?.id)
    || (MODAL_TYPES_DATA.USER === apiData?.data?.creator_type && apiData?.data?.creator_id === currentUser?.id && !currentCompany)) {
      setUserIsAuthor(true);
    }
  }, [currentUser, apiData?.data, currentCompany]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <LayoutWithNavbar loggedInUser={!!loggedInUser}>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <Content>
        <MainContent>
          <Wrapper>
            <ImageComponent alt="Preview Image" src={apiData?.data?.og_image} width={600} height={400} />
            <Title dangerouslySetInnerHTML={{ __html: apiData?.data?.og_title }} />
            <WebsiteLink>
              <TextComp>{apiData?.data?.websiteName ?? extractWebsiteName(apiData?.data?.link)}</TextComp>
              <Link target="_blank" href={apiData?.data?.link}><ArrowUp /></Link>
            </WebsiteLink>
          </Wrapper>
        </MainContent>
        {apiData.data && (
          <DetailSection
            hasUserUpVoted={hasUserUpVoted}
            handleUpVote={handleUpVote}
            data={{ ...apiData.data, caption: apiData.data.description, published_date: new Date() }}
            userIsAuthor={userIsAuthor}
            publish={publish}
            publishLoading={publishLoading}
            postId={router.query.id as string}
            withFollowButton={!userIsAuthor}
            tertiaryText={publishedDate}
            comments={comments}
            commentsData={commentsData}
            contentType={CONTENT_TYPE.LINKS}
            pinType={PINS_TYPES.LINKS}
            itemType={IInteractionItemTypes.links}
            setSkip={setSkip}
            {...apiData.data?.description ? { postCardData: apiData.data } : {}}
          />
        )}

      </Content>
    </LayoutWithNavbar>
  );
};
export default ViewShareLinkPage;
