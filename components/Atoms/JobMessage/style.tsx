import Image from 'next/image';
import styled from 'styled-components';
import { KebabMenuWrapper } from 'components/KebabMenu/styles';
import { UserMessageContainerProps } from './type';

export const UserMessageContainer = styled.div<UserMessageContainerProps>`
  display: flex;
  padding: 24px;
  cursor: pointer;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  gap: 16px;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme, active }) => active ? theme.palette.gray[50].value : 'transparent'};
  position: relative;
  ${KebabMenuWrapper} {
    circle {
      fill: ${({ theme }) => theme.palette.white[100].value};
    }
    position: absolute;
    top: 30px;
    right: 0;
    > div {
      padding: 16px;
      height: max-content;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
      background: ${({ theme, active }) => active ? theme.palette.gray[80].value : theme.palette.gray[50].value};
      li {
        margin-bottom: 0;
      }
    }
    display: none;
  }
  :hover {
    ${KebabMenuWrapper} {
      display: block;
    }
  }
`;

export const EmptyCard = styled.div`
  width: 66px;
  height: 106px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
  width: 60%;
  svg {
    position: absolute;
    right: 16px;
    top: 50%;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  width: 254px;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

export const Name = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  line-height: 20px;
  text-transform: capitalize;
`;

export const CompanyName = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 20px;
`;

export const Message = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  line-height: 20px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Time = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
  line-height: 18px;
`;

export const StyledImage = styled(Image)`
  width: 66px;
  height: 66px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  object-fit: cover;
  `;

export const VideoContainer = styled.div`
  width: 66px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  height: 106px;
  overflow: hidden;
  position: relative;
`;
