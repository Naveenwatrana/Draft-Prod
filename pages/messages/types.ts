import { UserProfile } from 'pages/pro/types';
import { IJob } from 'pages/jobs/details/types';
import { ChatMessage, IConversationListData, IMessageData } from './components/Chat/type';

export type MessagesProps = {
  loggedInUser: UserProfile;
  profileData?: UserProfile;
  conversationList?: IConversationListData[];
  userMessages: IMessageData[];
  jobList: IConversationListData[];
  view?: number;
  participants?: UserProfile[];
  currentJob?: IJob;
};

export type JobMessageData = {
  id: number;
  uuid: string;
  job:IJob;
  participants: UserProfile[];
  last_message: IMessageData
};

export type ISidebarMessage = {
  message?: string;
  messageSender?: string;
  username?: string;
  companyName?: string;
  name: string;
  timestamp: string;
  media?: string;
  mantra?: string;
  active?: boolean;
  unread?: boolean;
  job?: IJob;
  uuid?: string;
  messages?: ChatMessage[];
};
