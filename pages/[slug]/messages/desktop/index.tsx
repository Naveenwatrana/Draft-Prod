import useJobMessages from 'common/hooks/useJobMessages';
import { pro } from 'common/utils/network/appRouts';
import { CompanyPageContainer } from 'pages/jobs/details/styles';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'common/utils/router-fill';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { JOB_VIEW_TYPE } from 'common/types';
import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import { ToastContainer } from 'react-toastify';
import NavbarCompact from 'components/Molecules/JobNavbarCompact';
import NotFound from 'pages/404/index.page';
import { MessagesProps } from '../types';
import NoMessages from '../components/NoMessages';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import { Container } from '../style';

const DesktopMessages = ({
  loggedInUser,
  profileData,
  conversationList = [],
  userMessages,
  jobData,
  participants,
}: MessagesProps) => {
  const { messages, activeMessage, reloadConversations } = useJobMessages(
    loggedInUser,
    profileData,
    jobData,
    conversationList,
  );
  const router = useRouter();
  const navigate = useNavigate();
  const currentCompany = useSelector(selectCurrentCompany);
  const isUserB2B = currentCompany?.id === jobData?.company?.id;
  const params = useParams() as { slug: string; view: string };
  const onMessageRead = (username: string) => {
    navigate(`/${params.slug}/messages${pro}/${username}`);
  };
  const { view, slug } = params;
  if (!isUserB2B) {
    return (
      <CompanyPageContainer>
        <NavbarCompact
          step={1}
          stepsToRender={[]}
          title={jobData?.role.name || ''}
          onBack={() => router.back()}
          isAuthor={isUserB2B}
          view={JOB_VIEW_TYPE.MESSAGES}
          slug={params.slug}
          status={jobData?.status}
        />
        <NotFound />
      </CompanyPageContainer>
    );
  }
  return (
    <LayoutWithNavbar loggedInUser>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <CompanyPageContainer>
        {view !== JOB_VIEW_TYPE.JOB && (
          <NavbarCompact
            step={1}
            stepsToRender={[]}
            title={jobData?.role?.name}
            onBack={() => router.back()}
            isAuthor={isUserB2B}
            view={JOB_VIEW_TYPE.MESSAGES}
            slug={slug}
            jobData={jobData}
          />
        )}
        {!messages?.length && !profileData && <NoMessages />}
        <Container>
          <span style={{ display: 'flex', width: '100%', marginTop: '70px' }}>
            {!!messages?.length && (
              <>
                <Sidebar messages={messages} onClick={onMessageRead} />
                {activeMessage && (
                  <ChatBox
                    userMessages={userMessages}
                    messages={activeMessage}
                    profileData={profileData}
                    loggedInUser={loggedInUser}
                    reloadConversation={reloadConversations}
                    jobData={jobData}
                    participants={participants}
                  />
                )}
              </>
            )}
          </span>
        </Container>
      </CompanyPageContainer>
    </LayoutWithNavbar>
  );
};

export default DesktopMessages;
