import React, { useEffect, useRef, useState } from 'react';
import lang from 'common/lang';
import { useAddConversationsMutation, useAddMessageConversationsMutation } from 'pages/messages/messagesService';
import { formatChatMessage, formatConversation, formatJobChatMessage } from 'pages/messages/util';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { ToastContainer } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import useDirectMessage from 'common/hooks/useDirectMessage';
import Text from 'components/text/text';
import { ChatBegningContainer, ChatBoxContainer, ChatContainer } from './style';
import { ChatBoxProps } from './types';
import InitialChat from './InitialChat';
import ChatInput from './ChatInput';
import { ChatMessage, IMessageData, ParticipantType } from '../Chat/type';
import ChatMessages from '../Chat/ChatMessages';

const {
  messages: { begningOfJobConversation, begningOfJobConversationSub },
} = lang;

const ChatBox = ({
  profileData, loggedInUser, messages: messagesData, userMessages, reloadConversation, currentJob, view, participants,
}: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>();
  const { currentMessage, sendMessage } = useDirectMessage(
    messagesData?.uuid || currentConversationId,
  );
  useEffect(() => {
    if (reloadConversation) reloadConversation();
    if (currentMessage?.id && currentMessage.sender_id !== loggedInUser.id && currentMessage?.conversation?.uuid === (currentConversationId || messagesData?.uuid)) {
      const messageToAdd = view === 1 ? formatJobChatMessage(
        [currentMessage as IMessageData],
        loggedInUser.id,
        profileData?.cards?.[0]?.fields?.media,
        participants,
      ) : formatChatMessage(
        [currentMessage as IMessageData],
        loggedInUser.id,
        profileData?.cards?.[0]?.fields?.media,
      );
      if (!messages.at(-1)?.isSender) {
        delete messageToAdd[0].avatar;
      }
      setMessages([...messages, messageToAdd[0]]);
    }
  }, [currentMessage?.id]);

  const [addConversationApi, addConversationResult] = useAddConversationsMutation();
  const [addMessageToConversationApi] = useAddMessageConversationsMutation();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (userMessages) {
      setMessages(view === 1
        ? formatJobChatMessage(
          [...(userMessages || [])]?.reverse(),
          loggedInUser.id,
          profileData?.cards?.[0]?.fields?.media,
          participants,
        )
        : formatChatMessage(
          [...(userMessages || [])]?.reverse(),
          loggedInUser.id,
          profileData?.cards?.[0]?.fields?.media,
        ));
    }
  }, [loggedInUser.id, profileData?.cards, userMessages]);
  const handleMessagePost = async (message: string) => {
    setMessages([...messages, { message, timestamp: new Date(), isSender: true }]);
    sendMessage({
      id: messages.length + 1,
      sender_id: loggedInUser.id,
      content: message,
      sender: { id: loggedInUser.id },
      conversation: {
        uuid: messagesData?.uuid || currentConversationId,
      },
    });
    if (profileData && loggedInUser) {
      const conversation = formatConversation(message, loggedInUser, profileData);
      if (!messagesData?.messages?.length && !currentConversationId) {
        addConversationApi(conversation)
          .unwrap()
          .then((data) => {
            setCurrentConversationId(data.data.uuid);
          })
          .catch((error) => showNotification(error?.data?.message, NotificationType.ERROR));
      } else if (messagesData?.uuid || currentConversationId) {
        addMessageToConversationApi({ body: conversation, uuid: messagesData?.uuid || currentConversationId })
          .unwrap()
          .catch((error) => showNotification(error?.data?.message, NotificationType.ERROR));
      }
    } else if (view === 1 && loggedInUser) {
      const conversation = {
        message: {
          content: message,
          sender_id: loggedInUser.id,
          sender_type: ParticipantType.USER,
        },
      };
      addMessageToConversationApi({ body: conversation, uuid: messagesData?.uuid || currentConversationId })
        .unwrap()
        .catch((error) => showNotification(error?.data?.message, NotificationType.ERROR));
    }
  };
  return (
    <ChatBoxContainer ref={chatContainerRef}>
      {addConversationResult.isLoading && <Loader />}
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      <ChatContainer>
        <InitialChat currentJob={currentJob} profileData={profileData} loggedInUser={loggedInUser} messageDisplay={!messages?.length} />
        {view === 1 && (
          <ChatBegningContainer>
            <Text component="h2">{begningOfJobConversation}</Text>
            <Text component="h3">{begningOfJobConversationSub}</Text>
          </ChatBegningContainer>
        )}

        <ChatMessages messages={messages} />
      </ChatContainer>
      <ChatInput onPostMessage={handleMessagePost} />
    </ChatBoxContainer>
  );
};

export default ChatBox;
