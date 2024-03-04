import TextComp from 'components/textComp';
import Link from 'next/link';
import styled from 'styled-components';
import { DividerComp } from 'components/Divider/styles';
import { MeltwaterCardType } from './types';
type CardContainerProps = {
  hidden: boolean;
  cardType?: MeltwaterCardType;
  withoutImage?: boolean;
};

export const StaticCardContainer = styled.div<CardContainerProps>`
  width: 274px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #201E21; // TODO: add color
  border-radius: 12px;
  align-self: flex-start;
  img {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  svg {
    margin-top: -1px;
  }
  ${({ theme, cardType, withoutImage }) => cardType === MeltwaterCardType.horizontal
    && `
    border-radius: 16px;
    padding: 24px;
    img {
      width: 108.2px;
      height: 112.116px;
      border-radius: 12px;
      position: absolute;
      right: 24px;
    }
    @media (max-width: 425px) {
      width: 280px;
    }
    @media (max-width: 350px) {
      width: 225px;
    }
    ${FeedInfo} {
      padding: 0;
      width: 100%;
    }
    ${FeedTitle} {
      -webkit-line-clamp: 4;
      width: ${withoutImage ? '100%' : 'calc(100% - 122px)'};
      height: 116px;
      font-size: ${theme.typography['20 regular'].fontSize.value}px;
      line-height: 28px;
      margin-bottom: 24px;
    }
    ${FeedDate}, ${FeedAuthor} {
      font-size: ${theme.typography['12 regular'].fontSize.value}px;
      line-height: 18px;
    }
    ${FeedDate} {
      color: #807984 // TODO: Add color
    }
    ${DividerComp} {
      background-color: #39363B // TODO: Add color
    }
 `};

  ${({ hidden }) => hidden
    && `
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(18, 18, 20, 0.51) 50%,
    #000000 91.15%
    );
    opacity: 0.8;
    border-radius: 12px;
  }
  `};
`;

export const CardContainer = styled(Link)<CardContainerProps>`
  width: 286px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #201E21; // TODO: add color
  border-radius: 12px;
  align-self: flex-start;
  img {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  svg {
    margin-top: -1px;
  }
  ${({ theme, cardType, withoutImage }) => cardType === MeltwaterCardType.horizontal
    && `
    width: 316px;
    border-radius: 16px;
    padding: 24px;
    img {
      width: 108.2px;
      height: 112.116px;
      border-radius: 12px;
      position: absolute;
      right: 24px;
    }
    @media (max-width: 425px) {
      width: 280px;
    }
    @media (max-width: 350px) {
      width: 225px;
    }
    ${FeedInfo} {
      padding: 0;
      width: 100%;
    }
    ${FeedTitle} {
      -webkit-line-clamp: 4;
      width: ${withoutImage ? '100%' : 'calc(100% - 122px)'};
      height: 116px;
      font-size: ${theme.typography['20 regular'].fontSize.value}px;
      line-height: 28px;
      margin-bottom: 24px;
    }
    ${FeedDate}, ${FeedAuthor} {
      font-size: ${theme.typography['12 regular'].fontSize.value}px;
      line-height: 18px;
    }
    ${FeedDate} {
      color: #807984 // TODO: Add color
    }
    ${DividerComp} {
      background-color: #39363B // TODO: Add color
    }
 `};

  ${({ hidden }) => hidden
    && `
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(18, 18, 20, 0.51) 50%,
    #000000 91.15%
    );
    opacity: 0.8;
    border-radius: 12px;
  }
  `};
`;

export const StackContainer = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 4.37px;
  left: 24px;
  top: 28px;
  cursor: pointer;
`;

export const NumberOfCard = styled(TextComp)`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
`;

export const CoverImage = styled.img`
  width: 286px;
  height: 247px;
  object-fit: cover;
`;

export const FeedInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px;
  align-self: baseline;
  width: calc(100% - 32px);
`;

export const FeedTitle = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  height: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const FeedDate = styled.div`
  color: ${({ theme }) => theme.palette.gray['10'].value};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
`;

export const FeedAuthor = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: 11px;
  line-height: 18px;
`;

export const FeedFooter = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  svg {
    position: absolute;
    right: 0;
    top: 4px;
  }
`;

export const LabelText = styled(TextComp)`
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
`;

export const StatusWrapper = styled(TextComp)`
  padding: 4px 8px;
  width: fit-content;
  border-radius: 8px;
  color: ${(props) => props.theme.palette.white['100'].value};
  background-color: ${(props) => props.theme.palette.gray['60'].value};
`;

export const ContentContainer = styled(TextComp)`
  padding: 16px;
  > div {
    display: flex;
    gap: 8px;
    align-items: center;
    height: 26px;
  }
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const Container = styled.div`
  margin-left: 121px;
  width: 100%;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
`;
