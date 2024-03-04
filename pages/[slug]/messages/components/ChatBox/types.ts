import { ISidebarMessage } from 'pages/messages/types';
import { UserProfile } from 'pages/pro/types';
import { IJob } from 'pages/jobs/details/types';
import * as yup from 'yup';
import { IMessageData } from '../Chat/type';

export type ChatBoxProps = {
  messages?: ISidebarMessage;
  loggedInUser: UserProfile;
  profileData?: UserProfile;
  userMessages?: IMessageData[];
  jobData: IJob;
  participants?: UserProfile[];
  reloadConversation?: () => void;
};

export type InitialChatProps = {
  loggedInUser: UserProfile;
  profileData: UserProfile;
  messageDisplay?: boolean;
  jobData: IJob;
};

export const schema = yup
  .object()
  .shape({
    message: yup.string(),
  })
  .required();

export type IMessage = {
  message: string;
};

export type ChatInputProps = {
  onPostMessage: (message: string) => void;
};
