import { IJob } from 'pages/jobs/details/types';
import { UserProfile } from 'pages/pro/types';

export type ChatProps = {
  message?: ChatMessage;
  date?: Date;
  isSameSender?: boolean;
};

export type ChatMessagesProps = {
  messages: ChatMessage[];
};

export type ChatMessage = {
  message: string;
  isSender?: boolean;
  timestamp: Date;
  avatar?: string;
  senderId?: number;
  senderName?: string;
};

export type MessageProps = {
  isSender?: boolean;
  isSameSender?: boolean;
};

export type MessageByDay = {
  date: Date;
  messages: ChatMessage[];
};

export enum ParticipantType {
  USER = 'users',
  COMPANY = 'companies',
}

export type IConversationData = {
  participants: IParticipantsData[];
  message: IMessageData;
}

export type IParticipantsData = {
  id: number;
  type: ParticipantType;
}

export type IParticipant = {
  conversation_id: number;
  participant_id: number;
  participant_type: string;
  id: number;
  participant: UserProfile;
}

export type IMessageData = {
  sender_id: number;
  sender_type: string;
  content: string;
  sender?: { id: string, name: string, first_name?: string; };
  read_at?: string;
  updated_at?: string;
};

export type IConversationListData = {
  id: number;
  uuid: string;
  messages_count: number;
  last_message_at: string;
  participants: IParticipant[];
  last_message?: IMessageData;
  job?:IJob;
};

export type IMessageReadData = {
  sender_id: number;
  sender_type?: string;
  content: string;
  sender?: { id: number };
  read_at?: string;
  updated_at?: string;
  conversation: {
    uuid?: string;
  }
  id: number;
};
