import styled from 'styled-components';
import { MessageProps } from './type';

export const VideoContainer = styled.div`
  width: 32px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  height: 51.394px;
  overflow: hidden;
  position: absolute;
  left: -40px;
  top: 0;
`;

export const StyledMessage = styled.div<MessageProps>`
  margin-left: ${({ isSender }) => (isSender ? 'auto' : '32px')};
  margin-right: ${({ isSender }) => (isSender ? '0' : 'auto')};
  padding: 16px;
  border-radius: 8px;
  position: relative;
  white-space: pre-wrap;
  max-width: calc(100% - 100px);
  word-wrap: break-word;
  margin-top: ${({ isSameSender }) => (isSameSender ? 'auto' : '8px')};
  background: ${({ theme, isSender }) => isSender ? '#54abac7f' : theme.palette.gray[50].value}; // TODO: Add Color
  img {
    width: 32px;
    height: 51.394px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    object-fit: cover;
    position: absolute;
    left: -40px;
    top: 0;
  }
  @media screen and (max-width: 1023px) {
    margin-left: ${({ isSender }) => (isSender ? 'auto' : '54px')};
    margin-right: ${({ isSender }) => (isSender ? '16px' : 'auto')};
    max-width: calc(75% - 128px);
  }
  @media screen and (min-width: 1023px) {
    max-width: calc(75% - 128px);
  }
`;

export const EmptyCard = styled.div`
  width: 32px;
  height: 51.394px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  object-fit: cover;
  position: absolute;
  left: -40px;
  top: 0;
`;

export const StyledDate = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  color: ${({ theme }) => theme.palette.gray[20].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
`;
