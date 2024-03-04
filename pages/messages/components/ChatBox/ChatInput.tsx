import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import React, { useEffect, useRef, useState } from 'react';
import SmileyIcon from 'components/Icons/SmileyIcon';
import ButtonComp from 'components/buttonComp';
import PaperPlaneIcon from 'components/Icons/PaperPlane';
import lang from 'common/lang';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { Textarea } from 'components/Description/styles';
import useAutosizeTextArea from 'common/hooks/useAutosizeTextArea';
import { useParams } from 'common/utils/router-fill';
import { ChatInputContainer, EmojiContainer, StyledChatInput } from './style';
import { ChatInputProps } from './types';

const {
  messages: { writeMessage },
} = lang;

const ChatInput = ({ onPostMessage }: ChatInputProps) => {
  const [message, setMessage] = useState<string>('');
  const [showEmojis, setShowEmojis] = useState(false);
  const addEmoji = (e: { native: string; }) => {
    setMessage(`${message + e.native}`);
  };
  const params = useParams();
  useEffect(() => {
    setMessage('');
  }, [params]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({ ref: wrapperRef, outSideClick: () => setShowEmojis(false) });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, message);

  const handleMessageSent = () => {
    if (message.trim()) {
      onPostMessage(message);
      setMessage('');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => setMessage(e.target.value);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ): false | void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleMessageSent();
    }
  };

  return (
    <ChatInputContainer>
      <StyledChatInput>
        <Textarea
          placeholder={writeMessage}
          id="message"
          onChange={handleChange}
          value={message}
          onKeyDown={handleKeyDown}
          rows={1}
          ref={textAreaRef}
          data-cy="inputBox"
        />

        <SmileyIcon onClick={() => setShowEmojis(true)} />
        {showEmojis && (
          <EmojiContainer ref={wrapperRef}>
            <Picker onEmojiSelect={addEmoji} data={data} />
          </EmojiContainer>
        )}
      </StyledChatInput>
      <ButtonComp
        onClick={handleMessageSent}
        primary
        label={<PaperPlaneIcon variant="outlined" />}
      />
    </ChatInputContainer>
  );
};

export default ChatInput;
