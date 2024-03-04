import React, { useState } from 'react';
import lang from 'common/lang';
import EllipseIcon from 'components/Icons/EllipseIcon';
import KebabMenu from 'components/KebabMenu';
import { ListItem } from 'components/KebabMenu/styles';
import { formatTimeStamp } from 'common/utils/date/dateFormat';
import {
  CompanyName,
  ContentContainer,
  EmptyCard,
  Message,
  Name,
  NameContainer,
  StyledImage,
  Time,
  UserMessageContainer,
} from './style';
import { UserMessageProps } from './type';

const {
  messages: { deleteMessage },
} = lang;

const JobMessage = (props: UserMessageProps) => {
  const { message, onClick } = props;
  const [closeMenu, setCloseMenu] = useState(false);
  const hasLogo = message.job?.company?.logo;
  const onDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
  };
  return (
    <UserMessageContainer
      active={message.active}
      onClick={() => { onClick(message.uuid || ''); }}
      onMouseLeave={() => setCloseMenu(true)}
      onMouseEnter={() => setCloseMenu(false)}
    >
      {hasLogo ? (
        <StyledImage src={message?.job?.company?.logo || ''} alt="image" width={66} height={66} />
      ) : (
        <EmptyCard />
      )}
      <ContentContainer>
        <NameContainer>
          <Name>{message.job?.title}</Name>
          <CompanyName>{message.job?.company?.name}</CompanyName>
          <Time>{formatTimeStamp(message.timestamp)}</Time>
        </NameContainer>
        <Message>
          <b>
            {`${message.messageSender}: `}
          </b>
          {message.message}
        </Message>
        <KebabMenu
          list={(
            <ListItem
              onClick={onDelete}
              data-cy="deleteMessage"
            >
              {deleteMessage}
            </ListItem>
          )}
          closeMenu={closeMenu}
        />
        {message.unread && <EllipseIcon />}
      </ContentContainer>
    </UserMessageContainer>
  );
};

export default JobMessage;
