import React from 'react';
import NoMessageIcon from 'components/Icons/NoMessages.svg';
import lang from 'common/lang';
import { SubTitle, SubTitleReasons, Title } from 'pages/messages/style';
import { NoMessagesContainer } from './style';
const {
  messages: {
    reasonTitle, reason1, reason2, noJobMessagesToDisplay,
  },
} = lang;
const NoJobMessages = () => {
  return (
    <NoMessagesContainer>
      <NoMessageIcon />
      <Title>{noJobMessagesToDisplay}</Title>
      <SubTitle>{reasonTitle}</SubTitle>
      <SubTitleReasons>{reason1}</SubTitleReasons>
      <SubTitleReasons>{reason2}</SubTitleReasons>
    </NoMessagesContainer>
  );
};

export default NoJobMessages;
