import React from 'react';
import NoMessageIcon from 'components/Icons/NoMessages.svg';
import lang from 'common/lang';
import { SubTitle, Title } from 'pages/messages/style';
import { NoMessagesContainer } from './style';
const {
  messages: { startFollowingToMessage, noMessagesToDisplay },
} = lang;
const NoMessages = () => {
  return (
    <NoMessagesContainer>
      <NoMessageIcon />
      <Title>{noMessagesToDisplay}</Title>
      <SubTitle>{startFollowingToMessage}</SubTitle>
    </NoMessagesContainer>
  );
};

export default NoMessages;
