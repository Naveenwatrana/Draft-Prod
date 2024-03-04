import { UserProfile } from 'pages/pro/types';
import { IJob } from 'pages/jobs/details/types';
import { ChatMessage, IConversationListData, IMessageData } from './components/Chat/type';

export type MessagesProps = {
  loggedInUser: UserProfile;
  profileData?: UserProfile;
  conversationList?: IConversationListData[];
  userMessages: IMessageData[];
  jobData: IJob;
  participants?: UserProfile[];
};

export type ISidebarMessage = {
  message?: string;
  username?: string;
  companyName?: string;
  name: string;
  timestamp: string;
  media?: string;
  mantra?: string;
  active?: boolean;
  unread?: boolean;
  uuid?: string;
  messages?: ChatMessage[];
};
