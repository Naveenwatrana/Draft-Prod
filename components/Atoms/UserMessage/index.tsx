import React, { useState } from 'react';
import lang from 'common/lang';
import EllipseIcon from 'components/Icons/EllipseIcon';
import Video from 'components/VideoPlayer';
import { removeURLSpace } from 'components/CardCreationWizard/components/CardFields/utils';
import KebabMenu from 'components/KebabMenu';
import { ListItem } from 'components/KebabMenu/styles';
import { formatTimeStamp } from 'common/utils/date/dateFormat';
import {
  ContentContainer,
  EmptyCard,
  Message,
  Name,
  NameContainer,
  StyledImage,
  Time,
  UserMessageContainer,
  VideoContainer,
} from './style';
import { UserMessageProps } from './type';

const {
  messages: { beginningOfConversation, deleteMessage },
} = lang;

const UserMessage = ({
  message: {
    media,
    username,
    companyName,
    timestamp,
    message,
    active,
    unread,
    name,
    uuid,
  }, onClick,
}: UserMessageProps) => {
  const isVideo = (['mp4', 'MOV', '.mov', '.MP4'].some((url) => media?.includes(url)) && media);
  const [closeMenu, setCloseMenu] = useState(false);
  const onDelete = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
  };
  return (
    <UserMessageContainer
      active={active}
      onClick={() => onClick(username || companyName || '', uuid || '')}
      onMouseLeave={() => setCloseMenu(true)}
      onMouseEnter={() => setCloseMenu(false)}
    >
      {media && !isVideo && (
        <StyledImage src={media} alt="image" width={66} height={106} />
      )}
      {!media && !isVideo && (
        <EmptyCard />
      )}
      {isVideo && (
        <VideoContainer>
          <Video media={removeURLSpace(media || '')} mute={true} />
        </VideoContainer>
      )}
      <ContentContainer>
        <NameContainer>
          <Name>{name}</Name>
          <Time>{formatTimeStamp(timestamp)}</Time>
        </NameContainer>
        <Message>{message || beginningOfConversation}</Message>
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
        {unread && <EllipseIcon />}
      </ContentContainer>
    </UserMessageContainer>
  );
};

export default UserMessage;
