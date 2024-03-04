import React, { useEffect, useRef, useState } from 'react';
import { useAddJobConversationsMutation, useAddMessageConversationsMutation } from 'pages/messages/messagesService';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { ToastContainer } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import useDirectMessage from 'common/hooks/useDirectMessage';
import { formatChatMessage, formatConversation } from '../../util';
import { ChatBoxContainer, ChatContainer } from './style';
import { ChatBoxProps } from './types';
import InitialChat from './InitialChat';
import ChatInput from './ChatInput';
import { ChatMessage, IMessageData } from '../Chat/type';
import ChatMessages from '../Chat/ChatMessages';

const ChatBox = ({
  profileData, loggedInUser, messages: messagesData, userMessages, reloadConversation, jobData, participants,
}: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>();
  const { currentMessage, sendMessage } = useDirectMessage(
    messagesData?.uuid || currentConversationId,
  );
  const auth = localStorage.getItem('auth');
  const user = auth && JSON.parse(auth)?.user;
  useEffect(() => {
    if (reloadConversation) reloadConversation();
    if (currentMessage?.id && currentMessage.sender_id !== user.id && currentMessage?.conversation?.uuid === (currentConversationId || messagesData?.uuid)) {
      const messageToAdd = formatChatMessage(
        [currentMessage as IMessageData],
        user.id,
        profileData?.cards?.[0]?.fields?.media,
        participants,
      );
      if (!messages.at(-1)?.isSender) {
        delete messageToAdd[0].avatar;
      }
      setMessages([...messages, messageToAdd[0]]);
    }
  }, [currentMessage?.id]);

  const [addConversationApi, addConversationResult] = useAddJobConversationsMutation();
  const [addMessageToConversationApi] = useAddMessageConversationsMutation();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (userMessages) {
      setMessages(formatChatMessage(
        [...(userMessages || [])]?.reverse(),
        user.id,
        profileData?.cards?.[0]?.fields?.media,
        participants,
      ));
    }
  }, [user.id, profileData?.cards, userMessages]);
  const handleMessagePost = async (message: string) => {
    setMessages([...messages, { message, timestamp: new Date(), isSender: true }]);
    sendMessage({
      id: messages.length + 1,
      sender_id: user.id,
      content: message,
      sender: { id: user.id },
      conversation: {
        uuid: messagesData?.uuid || currentConversationId,
      },
    });
    if (profileData && loggedInUser) {
      const conversation = formatConversation(message, user, profileData, jobData);
      if (!messagesData?.messages?.length && !currentConversationId) {
        addConversationApi({ body: conversation, id: jobData.id || '' })
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
        {!!profileData && <InitialChat profileData={profileData} jobData={jobData} loggedInUser={loggedInUser} messageDisplay={!messages?.length} />}
        <ChatMessages messages={messages} />
      </ChatContainer>
      <ChatInput onPostMessage={handleMessagePost} />
    </ChatBoxContainer>
  );
};

export default ChatBox;
