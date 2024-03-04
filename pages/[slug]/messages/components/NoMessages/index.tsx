import React from 'react';
import NoMessageIcon from 'components/Icons/NoMessages.svg';
import lang from 'common/lang';
import { Title } from 'pages/messages/style';
import { NoMessagesContainer, NoMessageSubTitle } from './style';
const { jobs } = lang;
const {
  applicants,
} = jobs;
const NoMessages = () => {
  return (
    <NoMessagesContainer>
      <NoMessageIcon />
      <Title>{applicants.noMessages.title}</Title>
      <NoMessageSubTitle>{applicants.noMessages.discription}</NoMessageSubTitle>
    </NoMessagesContainer>
  );
};

export default NoMessages;
