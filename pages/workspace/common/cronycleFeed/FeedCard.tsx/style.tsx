import TextComp from 'components/textComp';
import Link from 'next/link';
import styled from 'styled-components';
type CardContainerProps = {
  hidden: boolean;
}
export const CardContainer = styled(Link)<CardContainerProps>`
  height: 483px;
  width: 286px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.palette.gray[100].value};
  border-radius: 12px;
  img {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  svg {
    margin-top: -1px;
  }
  ${({ hidden }) => hidden && `
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
  gap: 16px;
  padding: 16px;
  align-self: baseline;
`;

export const FeedTitle = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: ${({ theme }) => theme.typography['20 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 regular'].fontWeight};
  height: 90px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FeedDate = styled.div`
  color: ${({ theme }) => theme.palette.gray['10'].value};
  font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
`;

export const FeedAuthor = styled.div`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
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
