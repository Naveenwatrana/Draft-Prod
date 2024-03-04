import React from 'react';
import UserMessage from 'components/Atoms/UserMessage';
import lang from 'common/lang';
import JobMessage from 'components/Atoms/JobMessage';
import { CONVERSATION_VIEW_TYPE } from 'common/types';
import { Container, MessageTitle, MessageOption } from './style';
import { SidebarProps } from './types';
import NoJobMessages from '../NoJobMessages';
const {
  messages: { jobs, followers },
} = lang;
const Sidebar = ({
  messages, jobList, onClick, view, activeMessage,
}: SidebarProps) => {
  const [active, setActive] = React.useState(view);
  return (
    <>
      <Container>
        <MessageTitle>
          <MessageOption isActive={active === CONVERSATION_VIEW_TYPE.REGULAR} onClick={() => { setActive(CONVERSATION_VIEW_TYPE.REGULAR); }}>{followers}</MessageOption>
          <MessageOption isActive={active === CONVERSATION_VIEW_TYPE.JOB} onClick={() => { setActive(CONVERSATION_VIEW_TYPE.JOB); }}>{jobs}</MessageOption>
        </MessageTitle>
        {active === CONVERSATION_VIEW_TYPE.REGULAR && messages?.map((message) => (
          <UserMessage message={message} onClick={onClick} key={message.uuid} />
        ))}
        {active === CONVERSATION_VIEW_TYPE.JOB && jobList?.map((job) => (
          <JobMessage message={job} onClick={onClick} key={job.uuid} />
        ))}
      </Container>
      {active === CONVERSATION_VIEW_TYPE.JOB && jobList?.length === 0 && !activeMessage && <NoJobMessages />}
    </>
  );
};

export default Sidebar;
