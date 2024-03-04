import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import useMessages from 'common/hooks/useMessages';
import { CONVERSATION_VIEW_TYPE } from 'common/types';
import { MessagesProps } from '../types';
import NoMessages from '../components/NoMessages';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';

const DesktopMessages = ({
  loggedInUser,
  profileData,
  conversationList = [],
  userMessages,
  jobList,
  view,
  currentJob,
  participants,
}: MessagesProps) => {
  const curView = view || CONVERSATION_VIEW_TYPE.REGULAR;
  const {
    messages, activeMessage, onMessageRead, reloadConversations, jobs,
  } = useMessages(
    loggedInUser,
    jobList,
    profileData,
    curView,
    conversationList,
  );
  return (
    <LayoutWithNavbar loggedInUser={!!loggedInUser}>
      <span style={{ display: 'flex' }}>
        {!(messages?.length || jobs?.length) && !profileData && curView === CONVERSATION_VIEW_TYPE.REGULAR && <NoMessages />}
        {!!(messages?.length || jobs?.length) && (
          <>
            <Sidebar jobList={jobs} messages={messages} view={curView} activeMessage={!!activeMessage} onClick={onMessageRead} />
            {activeMessage && (
              <ChatBox
                userMessages={userMessages}
                messages={activeMessage}
                profileData={profileData}
                loggedInUser={loggedInUser}
                reloadConversation={reloadConversations}
                currentJob={currentJob}
                view={curView}
                participants={participants}
              />
            )}
          </>
        )}
      </span>
    </LayoutWithNavbar>
  );
};

export default DesktopMessages;
