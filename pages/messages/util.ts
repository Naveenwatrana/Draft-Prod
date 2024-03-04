import { UserProfile } from 'pages/pro/types';
import { companyOrgType } from 'pages/organization/create/const';
import { MODAL_TYPES_DATA } from 'common/types';
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

export const mapParticipant = (user: UserProfile): IParticipantsData => {
  return {
    id: user.id,
    type: getParticipantType(user),
  };
};

export const formatConversation = (
  message: string,
  sender: UserProfile,
  receiver: UserProfile,
): IConversationData => {
  return {
    participants: [mapParticipant(sender), mapParticipant(receiver)],
    message: {
      sender_id: sender.id,
      sender_type: getParticipantType(sender),
      content: message,
    },
  };
};

export const formatSidebarMessages = (conversationList: IConversationListData[], userId: number) : ISidebarMessage[] => {
  return conversationList?.map((conversation) => {
    const participant = conversation.participants?.find(
      (conv) => conv.participant_id !== userId,
    );
    const isCurrrentUserSender = conversation.last_message?.sender_id === userId;
    return {
      message: conversation.last_message?.content || '',
      messageSender: isCurrrentUserSender ? 'You' : conversation.last_message?.sender?.first_name || '',
      username: participant?.participant?.username || '',
      companyName: participant?.participant_type === MODAL_TYPES_DATA.COMPANY ? participant?.participant?.username : '',
      name: participant?.participant?.name || '',
      timestamp: conversation.last_message?.updated_at || '',
      media: participant?.participant?.cards?.[0]?.fields?.media || '',
      mantra: participant?.participant?.cards?.[0]?.fields?.mantra || '',
      job: conversation?.job,
      messages: [
        {
          message: conversation.last_message?.content || '',
          timestamp: conversation?.last_message?.updated_at
            ? new Date(conversation?.last_message?.updated_at)
            : new Date(),
          senderName: conversation?.last_message?.sender?.name,
          isSender: conversation.last_message?.sender_id === userId,
        },
      ],
      uuid: conversation.uuid,
    };
  }).sort((a, b) => { return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(); });
};

export const formatChatMessage = (messages: IMessageData[], userId: number, avatar?: string): ChatMessage[] => {
  const chatMessages: ChatMessage[] = [];
  messages.forEach((message, index) => {
    const isSender = message.sender_id === userId;
    const chatMessage = {
      message: message.content,
      isSender,
      timestamp: message.updated_at ? new Date(message.updated_at) : new Date(),
    };
    chatMessages.push(
      !isSender && (chatMessages?.[index - 1]?.isSender || !chatMessages?.[index - 1])
        ? { ...chatMessage, avatar: avatar || '' }
        : chatMessage,
    );
  });
  return chatMessages;
};

export const formatJobChatMessage = (messages: IMessageData[], userId: number, avatar?: string, participants?: UserProfile[]): ChatMessage[] => {
  const chatMessages: ChatMessage[] = [];
  messages.forEach((message, index) => {
    const isSender = message.sender_id === userId;
    const particepent = participants?.find((participant) => participant?.id === (message?.sender_id));
    const chatMessage = {
      message: message.content,
      isSender,
      senderId: message.sender_id,
      senderName: chatMessages?.[index - 1]?.senderId !== message?.sender_id ? message?.sender?.name : '',
      timestamp: message.updated_at ? new Date(message.updated_at) : new Date(),
    };
    chatMessages.push(
      !isSender && (chatMessages?.[index - 1]?.isSender || !chatMessages?.[index - 1] || chatMessages?.[index - 1].senderId !== message?.sender_id)
        ? { ...chatMessage, avatar: particepent?.cards?.[0]?.fields?.media || '' }
        : chatMessage,
    );
  });
  return chatMessages;
};
