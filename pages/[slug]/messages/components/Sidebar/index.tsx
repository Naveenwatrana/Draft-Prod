import React from 'react';
import UserMessage from 'components/Atoms/UserMessage';
import lang from 'common/lang';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { Container, MessageTitle } from './style';
import { SidebarProps } from './types';
const {
  messages: { messages: messageLabel },
} = lang;
const Sidebar = ({ messages, onClick }: SidebarProps) => {
  const isMobile = useIsMobile();
  return (
    <Container>
      {!isMobile && <MessageTitle>{messageLabel}</MessageTitle>}
      {messages?.map((message) => (
        <UserMessage message={message} onClick={onClick} key={message.uuid} />
      ))}
    </Container>
  );
};

export default Sidebar;
