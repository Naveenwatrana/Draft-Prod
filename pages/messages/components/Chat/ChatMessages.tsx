/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { AlwaysScrollToBottom } from 'components/Atoms/ScrollBottom';
import { ChatMessagesProps, MessageByDay } from './type';
import Chat from '.';

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const [dates, setDates] = useState<MessageByDay[]>();
  useEffect(() => {
    const datesToUpdate: MessageByDay[] = [];
    messages.forEach((message) => {
      const messageDate = message.timestamp.toDateString();
      const index = datesToUpdate.findIndex((date) => date.date.toDateString() === messageDate);
      if (index !== -1) {
        datesToUpdate[index] = {
          date: new Date(message.timestamp.toDateString()),
          messages: [...datesToUpdate[index].messages, message],
        };
      } else {
        datesToUpdate.push({
          date: new Date(messageDate),
          messages: [message],
        });
      }
    });
    setDates(datesToUpdate);
  }, [messages]);
  return (
    <>
      {dates?.map((date) => {
        return (
          <>
            <Chat date={date.date} />
            {date.messages.map((message, index) => (
              <Chat isSameSender={date.messages[index - 1] && (date.messages[index - 1]?.senderId === message.senderId)} message={message} key={message.timestamp.toString()} />
            ))}
          </>
        );
      })}
      {messages?.length > 0 && <AlwaysScrollToBottom />}
    </>
  );
};

export default ChatMessages;
