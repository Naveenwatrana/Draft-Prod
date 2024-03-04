import { UserProfile } from 'pages/pro/types';
import { companyOrgType } from 'pages/organization/create/const';
import { MODAL_TYPES_DATA } from 'common/types';
import { IJob } from 'pages/jobs/details/types';
import {
  ChatMessage,
  IConversationData,
  IConversationListData,
  IMessageData,
  IParticipantsData,
  ParticipantType,
} from './components/Chat/type';
import { ISidebarMessage } from './types';

export const getParticipantType = (user: UserProfile): ParticipantType => user.user_type === companyOrgType
  ? ParticipantType.COMPANY
  : ParticipantType.USER;

export const mapParticipant = (user: UserProfile, isCandidate?: boolean): IParticipantsData => {
  const participant = {
    id: user.id,
    type: getParticipantType(user),
    is_candidate: isCandidate || false,
  };
  return participant;
};

export const formatConversation = (
  message: string,
  sender: UserProfile,
  receiver: UserProfile,
  jobData: IJob,
): IConversationData => {
  return {
    participants: [mapParticipant(sender), mapParticipant(receiver, true), {
      id: parseInt(jobData.id),
      type: ParticipantType.JOB,
    }],
    message: {
      sender_id: sender.id,
      sender_type: getParticipantType(sender),
      content: message,
    },
  };
};

export const formatSidebarMessages = (conversationList: IConversationListData[], userId: number) : ISidebarMessage[] => {
  return conversationList.map((conversation) => {
    const participant = conversation.participants?.find(
      (conv) => conv.is_candidate === true,
    );
    return {
      message: conversation.last_message?.content || '',
      username: participant?.participant?.username || '',
      companyName: participant?.participant_type === MODAL_TYPES_DATA.COMPANY ? participant?.participant?.username : '',
      name: participant?.participant?.name || '',
      timestamp: conversation.last_message_at || '',
      media: participant?.participant?.cards?.[0]?.fields?.media || '',
      mantra: participant?.participant?.cards?.[0]?.fields?.mantra || '',
      messages: [
        {
          message: conversation.last_message?.content || '',
          timestamp: conversation?.last_message?.updated_at
            ? new Date(conversation?.last_message?.updated_at)
            : new Date(),
          isSender: conversation.last_message?.sender_id === userId,
        },
      ],
      uuid: conversation.uuid,
    };
  });
};

export const formatChatMessage = (messages: IMessageData[], userId: number, avatar?: string, participants?: UserProfile[]): ChatMessage[] => {
  const chatMessages: ChatMessage[] = [];
  messages.forEach((message, index) => {
    const isSender = message.sender_id === userId;
    const particepent = participants?.find((participant) => participant?.id === (message?.sender_id));
    const chatMessage = {
      message: message.content,
      isSender,
      senderName: message?.sender?.name,
      timestamp: message.updated_at ? new Date(message.updated_at) : new Date(),
    };
    chatMessages.push(
      !isSender && (chatMessages?.[index - 1]?.isSender || !chatMessages?.[index - 1] || chatMessages?.[index - 1].senderName !== message?.sender?.name)
        ? { ...chatMessage, avatar: particepent?.cards?.[0]?.fields?.media || '' }
        : chatMessage,
    );
  });
  return chatMessages;
};
