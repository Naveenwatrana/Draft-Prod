import { UserProfile } from 'pages/pro/types';

export type ChatProps = {
  message?: ChatMessage;
  date?: Date;
};

export type ChatMessagesProps = {
  messages: ChatMessage[];
};

export type ChatMessage = {
  message: string;
  isSender?: boolean;
  timestamp: Date;
  avatar?: string;
  senderName?: string;
};

export type MessageProps = {
  isSender?: boolean;
};

export type MessageByDay = {
  date: Date;
  messages: ChatMessage[];
};

export enum ParticipantType {
  USER = 'users',
  COMPANY = 'companies',
  JOB = 'jobs'
}

export type IConversationData = {
  participants: IParticipantsData[];
  message: IMessageData;
}

export type IParticipantsData = {
  id: number;
  type: ParticipantType;
  is_candidate?: boolean | undefined;
}

export type IParticipant = {
  conversation_id: number;
  participant_id: number;
  participant_type: string;
  id: number;
  is_candidate: boolean | null;
  participant: UserProfile;
}

export type IMessageData = {
  sender_id: number;
  sender_type: string;
  content: string;
  sender?: { id: string, name: string };
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
