import lang from 'common/lang';
import { useRouter } from 'next/router';
import useJobMessages from 'common/hooks/useJobMessages';
import NavbarCompact from 'components/Molecules/NavbarCompact';
import { JOB_VIEW_TYPE } from 'common/types';
import { useNavigate, useParams } from 'common/utils/router-fill';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from 'pages/account/authSlice';
import NotFound from 'pages/404/index.page';
import { pro, messagesUrl } from 'common/utils/network/appRouts';
import NoMessages from '../components/NoMessages';
import { Container } from './style';
import { MessagesProps } from '../types';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
const {
  messages: { messages: messagesLabel },
} = lang;
const MobileMessages = ({
  loggedInUser,
  profileData,
  conversationList,
  userMessages,
  jobData,
  participants,
}: MessagesProps) => {
  const router = useRouter();
  const currentCompany = useSelector(selectCurrentCompany);
  const isUserB2B = currentCompany?.id === jobData?.company?.id;
  const navigate = useNavigate();
  const params = useParams() as { slug: string};
  const onMessageRead = (username:string) => {
    navigate(`/${params.slug}${messagesUrl}${pro}/${username}`);
  };
  const { messages, activeMessage } = useJobMessages(
    loggedInUser,
    profileData,
    jobData,
    conversationList,
  );
  if (!isUserB2B) {
    return (
      <Container>
        <NavbarCompact
          step={1}
          stepsToRender={[]}
          title={jobData?.role.name || ''}
          onBack={() => router.back()}
          isAuthor={isUserB2B}
          view={JOB_VIEW_TYPE.MESSAGES}
          slug={params.slug}
        />
        <NotFound />
      </Container>
    );
  }
  return (
    <Container>
      <NavbarCompact
        step={1}
        stepsToRender={[]}
        title={jobData?.role.name || ''}
        onBack={() => router.back()}
        isAuthor={isUserB2B}
        view={JOB_VIEW_TYPE.MESSAGES}
        slug={params.slug}
      />
      {!messages?.length && !profileData && <NoMessages />}
      {!profileData && messages?.length && (
        <Sidebar messages={messages} onClick={onMessageRead} />
      )}
      {profileData && (
        <ChatBox
          userMessages={userMessages}
          profileData={profileData}
          loggedInUser={loggedInUser}
          messages={activeMessage}
          jobData={jobData}
          participants={participants}
        />
      )}
    </Container>
  );
};

export default MobileMessages;
