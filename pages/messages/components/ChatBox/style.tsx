import { Card } from 'components/DefaultCard/styles';
import styled from 'styled-components';

export const ChatBoxContainer = styled.div`
  display: inline-flex;
  padding: 32px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  position: relative;
  width: 100%;
  @media screen and (max-width: 1023px) {
    padding: 0;
  }
`;
export const ChatContainer = styled.div`
  display: inline-flex;
  padding: 32px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: -30px;
  width: calc(100% - 2px);
  height: calc(100vh - 256px);
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: relative;
  padding-bottom: 92px;
  @media screen and (max-width: 1023px) {
    height: calc(100vh - 276px);
    padding-bottom: 160px;
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  flex: 1;
`;

export const Ellipse = styled.div`
  width: 582px;
  height: 500px;
  flex-shrink: 0;
  border-radius: 582px;
  background: linear-gradient(
    136deg,
    rgba(227, 108, 253, 0.25) 0%,
    rgba(0, 88, 251, 0.25) 15.63%,
    rgba(46, 192, 251, 0.25) 40.63%,
    rgba(20, 247, 239, 0.25) 68.75%,
    rgba(249, 224, 51, 0.25) 84.38%,
    rgba(250, 161, 67, 0.25) 98.44%
  ); // TODO: Add color
  filter: blur(35px);
  @media screen and (max-width: 1023px) {
    width: 272px;
    height: 216px;
    margin-top: 62px;
    border-radius: 291px;
    background: linear-gradient(
      136deg,
      rgba(227, 108, 253, 0.25) 0.84%,
      rgba(0, 88, 251, 0.25) 16.21%,
      rgba(46, 192, 251, 0.25) 40.79%,
      rgba(20, 247, 239, 0.25) 68.43%,
      rgba(249, 224, 51, 0.25) 83.8%,
      rgba(250, 161, 67, 0.25) 97.62%
    );
    filter: blur(17.5px);
  }
`;
export const EllipseBlank = styled.div`
  width: 582px;
  height: 500px;
  flex-shrink: 0;
  border-radius: 582px;
  filter: blur(35px);
  @media screen and (max-width: 1023px) {
    width: 272px;
    height: 216px;
    margin-top: 62px;
    border-radius: 291px;
    filter: blur(17.5px);
  }
`;
export const ChatBegningContainer = styled.div`
  margin: 62px;
  text-align: center;
  line-height: 32px;
`;

export const CardsPreviewContainer = styled.div`
  position: absolute;
  height: 483px;
  display: flex;
  .jobCard{
    transform: rotate(-7deg);
    z-index: 1;
  }
  @media screen and (max-width: 1023px) {
    top: -58px;
  }
  ${Card}:first-child {
    transform: rotate(-7deg);
    width: 283px;
    margin-right: -48px;
    z-index: 1;
    @media screen and (max-width: 1023px) {
      margin-right: -105px;
      transform: scale(0.5) rotate(-7deg);
    }
  }
  ${Card}:last-child {
    width: 283px;
    transform: rotate(7deg);
    @media screen and (max-width: 1023px) {
      margin-left: -56px;
      transform: scale(0.5) rotate(7deg);
    }
  }
`;

export const ChatInputContainer = styled.div`
  display: flex;
  width: calc(100% - 80px);
  padding: 24px 40px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  z-index: 3;
  border-top: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  position: absolute;
  bottom: 0;
  button:last-child {
    height: 44px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 1023px) { 
    width: calc(100% - 48px);
    padding: 24px;
  }
`;

export const StyledChatInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 1;
  position: relative;
  svg {
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 15px;
  }
  textarea {
    padding: 16px;
    line-height: 18px;
    height: auto !important;
    width: calc(100% - 44px);
    padding-right: 32px;
    min-height: min-content;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const EmojiContainer = styled.div`
  bottom: 62px;
  right: 0;
  position: absolute;
  @media screen and (max-width: 1023px) { 
   right: auto;
  }
`;
