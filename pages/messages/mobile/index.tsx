import ChevronLeft from 'components/Icons/LeftChevron';
import TextComp from 'components/textComp';
import lang from 'common/lang';
import { useRouter } from 'next/router';
import useMessages from 'common/hooks/useMessages';
import { CONVERSATION_VIEW_TYPE } from 'common/types';
import NoMessages from '../components/NoMessages';
import { Container, IconWrapper, NavContainer } from './style';
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
  jobList,
  view,
  currentJob,
  participants,
}: MessagesProps) => {
  const router = useRouter();
  const curView = view || CONVERSATION_VIEW_TYPE.REGULAR;
  const {
    messages, activeMessage, onMessageRead, jobs,
  } = useMessages(
    loggedInUser,
    jobList,
    profileData,
    curView,
    conversationList,
  );
  return (
    <Container>
      <NavContainer>
        <IconWrapper>
          <ChevronLeft data-cy="goBack" onClick={router.back} />
        </IconWrapper>
        <TextComp>{profileData?.name || currentJob?.role?.name || messagesLabel}</TextComp>
      </NavContainer>
      {!(messages?.length || jobs?.length) && !profileData && curView === CONVERSATION_VIEW_TYPE.REGULAR && <NoMessages />}
      {!activeMessage && (messages?.length || jobs?.length) && (
        <Sidebar messages={messages} jobList={jobs} view={curView} activeMessage={!!activeMessage} onClick={onMessageRead} />
      )}
      {activeMessage && (
        <ChatBox
          userMessages={userMessages}
          profileData={profileData}
          loggedInUser={loggedInUser}
          messages={activeMessage}
          currentJob={currentJob}
          view={curView}
          participants={participants}
        />
      )}
    </Container>
  );
};

export default MobileMessages;
