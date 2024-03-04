import { IInteractionItemTypes } from 'common/services/Aladdin/types';
import { HR } from 'components/AnimatedPage/styles';
import styled from 'styled-components';

export const DetailContainer = styled.div<{ itemType: string }>`
  padding: 16px;
  max-width: 423px;
  height: ${({ itemType }) => itemType === IInteractionItemTypes.posts ? 'calc(100vh - 120px)' : 'calc(100vh - 98px)'};
  display: flex;
  flex-direction: column;
  position: relative;  
  @media (min-width: 1025px) {
      width: 30%;
  }
  @media (max-width: 1024px) {
    width: 90%;
    align-self: center;  
  }
  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
    width: 100%;
  };
  `;

export const DetailDataContainer = styled.div`
  padding: 24px 24px 24px 24px;
  border: 1px splid #282629;
  display: flex;
  border-radius: 16px 16px 0px 0px;
  flex-direction: column;
  background-color: #1E1C1F;
  gap: 24px;
  overflow-y: overlay;
  overflow-x: hidden;
  height: 78vh;
  &::-webkit-scrollbar-thumb {
    background: transparent; 
    border-radius: 5px;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: #38393a; 
      border-radius: 5px;
    }
  }
`;

export const MessageInputSection = styled.div`
  background-color: #1E1C1F;
  border-radius: 0px 0px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const UserName = styled.div`
  font-weight: 500;
  line-height: 18px;
  font-size: 14px;
  cursor: pointer;
`;

export const CaptionContainer = styled.div`
  line-height: 18px;
  font-size: 14px;
  color: #F7F7F7;
  position: relative;
`;

export const Caption = styled.div`
  line-height: 18px;
  font-size: 14px;
  color: #F7F7F7;
  overflow: hidden;
`;

export const MoreSection = styled.span`
  line-height: 18px;
  font-size: 14px;
  color: #F7F7F7;
  background-color: #1E1C1F;
  z-index:1;
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 70px;
  cursor: pointer;
`;

export const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const DividerHr = styled(HR)`
 margin: 0px -1px;
`;
