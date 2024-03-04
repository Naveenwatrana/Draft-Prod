import React from 'react';
import Image from 'next/image';
import Video from 'components/VideoPlayer';
import { removeURLSpace } from 'components/CardCreationWizard/components/CardFields/utils';
import { formatDate } from 'common/utils/date/dateFormat';
import { CHAT_DATE_FORMAT } from 'common/constants';
import { SenderName } from 'pages/[slug]/messages/components/Chat/style';
import {
  StyledDate, StyledMessage, VideoContainer, EmptyCard,
} from './style';
import { ChatProps } from './type';

const Chat = ({ isSameSender, message, date }: ChatProps) => {
  if (date) {
    return <StyledDate>{formatDate(date.toDateString(), CHAT_DATE_FORMAT)}</StyledDate>;
  }
  const isVideo = (media: string) => ['mp4', 'MOV', '.mov', '.MP4'].some((url) => media?.includes(url)) && media;
  return message ? (
    <StyledMessage
      isSender={message.isSender}
      isSameSender={isSameSender}
      key={message.timestamp.toDateString()}
    >
      {message.avatar && !isVideo(message.avatar) && (
        <Image src={message.avatar} alt="image" width={66} height={106} />
      )}
      {message.avatar && isVideo(message.avatar) && (
        <VideoContainer>
          <Video media={removeURLSpace(message.avatar)} mute={true} />
        </VideoContainer>
      )}
      {message.avatar === '' && <EmptyCard />}
      {!message.isSender && message.senderName && <SenderName>{message.senderName}</SenderName>}
      {message.message}
    </StyledMessage>
  ) : null;
};

export default Chat;
