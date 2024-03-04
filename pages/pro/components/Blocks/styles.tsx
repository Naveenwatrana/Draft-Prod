import { TextComp } from 'components/textComp';
import styled from 'styled-components';
import Button from 'components/buttonComp';
import { IconsContainer } from 'pages/pro/styles';
import { LogoWrapper, Container as LinkContainer } from '../LinkBlock/style';

type UserBlockContainerProps = {
    isEditing?: boolean;
    isHightLight?: boolean;
    isResponsiveBorder?: boolean
}

type ResponsiveBlockContainerProps = {
  isResponsiveBorder?: boolean;
}

type LinkBlockDisableProps = {
  editable? : boolean
}

type MaxLengthProps = {
  maxLength?: boolean
  minLength?: boolean;
  minMaxLength?: boolean;
  withoutTitle?: boolean;
}

export const Title = styled(TextComp)`
    margin-bottom: 24px;
`;

export const ReadMore = styled.span`
    font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
`;

export const BlockTitle = styled(TextComp)<MaxLengthProps>`
  font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  max-width: ${({ minLength }) => minLength ? '300px' : '660px'};
  height: ${({ withoutTitle }) => withoutTitle ? '0' : '52px'};
`;

export const UserBlock = styled(TextComp)<MaxLengthProps>`
    font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
    font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 26px;
    max-width: ${({ minLength }) => minLength ? '300px' : '660px'};
    padding: 18px 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    -webkit-line-clamp:  ${({ minMaxLength }) => minMaxLength ? 5 : 12};
    text-overflow: ellipsis;
    height: ${({ maxLength }) => maxLength ? '300px' : '112px'};
`;
export const Container = styled.div`
    display: flex;
    flex-direction: column; 
    background: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 32px;
    border-radius: 4px;
    max-width: 906px;
    width: 100%;
    margin: 0 auto;
`;

export const Counter = styled.div`
    display: flex;
    justify-content: right;
    margin-bottom: 10px;
`;

export const UserBlockContainer = styled.div<UserBlockContainerProps>`
  position: relative;
  background: ${({ theme }) => theme.palette.gray['60'].value};
  border: solid 1px ${({ theme }) => theme.palette.gray['40'].value} ;
  border:${({ theme, isEditing }) => isEditing && `solid 1px ${theme.palette.gray['20'].value}`} ;
  border-radius: 12px;
  @media screen and (min-width: 1023px) {
    :hover {
      ${IconsContainer} {
        display: flex;
      }
    }
  }
`;
export const GithubContainer = styled.div<MaxLengthProps>`
  display: ${({ maxLength }) => maxLength && 'flex'};
  flex-direction: ${({ maxLength }) => maxLength && 'row-reverse'};
  gap: 10px;
  position: relative;
  > .react-resizable-handle::after {
    z-index: 1;
  }
  width: 100%;
  background: ${({ theme }) => theme.palette.gray['60'].value};
  @media screen and (min-width: 1023px) {
    :hover {
      ${IconsContainer} {
        display: flex;
      }
    }
  }
`;

export const OverflowHiddenContainer = styled.div<LinkBlockDisableProps>`
display: flex;
  overflow: hidden;
  height: inherit;
  ${LinkContainer} {
    pointer-events: ${({ editable }) => editable ? 'none' : 'unset'};
  }
`;

export const IconContainer = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  right: 0;
  justify-content: center;
  align-items: center;
  width: 24px;
  border-radius: 50%;
  height: 24px;
  z-index: 1;
  position: absolute;
  margin-top: -10px;
  margin-right: -10px;
  svg {
    padding-right: 4px;
    padding-bottom: 4px;
  }
  display: none;
`;

export const ResponsiveBlockContainer = styled(UserBlockContainer)<ResponsiveBlockContainerProps>`
  .react-grid-layout {
    gap: 0;
    padding: 0;
  }
  :hover {
    ${IconContainer} {
      display: flex;
    }
  }
  .react-resizable-handle {
    background: transparent;
    z-index: 2;
  }
  .react-resizable-handle:after {
    height: 24px;
    width: 24px;
    background-repeat: no-repeat;
    border: none;
    right: -2px;
    bottom: -2px;
    cursor: se-resize;
  }
  :hover {
    border: ${({ theme, isResponsiveBorder }) => isResponsiveBorder && `1px solid ${theme.palette.violet[60].value}`};
    cursor: pointer;
    .react-resizable-handle:after {
      display: unset;
    }
    .resize-handle {
      visibility: visible !important;
    }
  }
`;

export const BlockWrapper = styled.div<UserBlockContainerProps>`
  ${({ isHightLight }) => isHightLight && `height: inherit;
  overflow: hidden;`}
  padding: 24px;
  padding: ${({ isHightLight }) => (isHightLight ? '0px' : '24px')};
  position: relative;
  border-radius: 12px;
  width: 100%;
  @media screen and (min-width: 1023px) {
    :hover {
      ${IconsContainer} {
        display: flex;
      }
    }
  }
`;

export const UserBlockText = styled(TextComp)`
    margin-top: 18px;
`;
export const GithubUrl = styled(TextComp)`
  display: block;
  color: #A69DAB; //TODO: add to theme
  font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
`;
export const SocialBlockInfo = styled.div<MaxLengthProps>`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  max-width: 345px;
  min-height: ${({ maxLength }) => maxLength ? '140px' : '100px'};
  overflow: hidden;
`;
export const SocialBlockTitle = styled(TextComp)`
  display: block;
  font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
  overflow: hidden;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: pre-wrap;
  text-overflow: ellipsis;
`;
export const SocialBlockDescription = styled(TextComp)`
  display: block;
  font-weight: ${(props) => props.theme.typography['16 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['16 semibold'].fontSize.value}px;
  color: ${({ theme }) => theme.palette.gray[10].value};
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-wrap;
`;
export const CalendarContainer = styled.div`
  display: flex;
  & > span {
    transform: rotate(-90deg) translateX(-89px);
    transform-origin: 0 0;
  }
`;
export const CalendarLabel = styled.span`
  color: #A69DAB; //TODO: add to theme
  font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
`;
export const Wrap = styled.div`
  max-width: 100%;
  padding-bottom: 12px;
  overflow-x: auto;

  &::-webkit-scrollbar-thumb {
    background: transparent; 
    border-radius: 5px;
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    height: 4px;
  }
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar {
    height: 5px;
    border-radius: 5px;
    position: absolute;
  }

  &::-webkit-scrollbar-track {
    background: #1E1C1F; 
  }
  
  &::-webkit-scrollbar-thumb {
    background: #38393a; 
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;
export const Stats = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  height: 70px;
  & > div:last-child {
    border-right: none;
  }
`;
export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: solid 1px ${({ theme }) => theme.palette.gray['40'].value};
  justify-content: center;
  width: 33%;
  margin: 24px auto;
`;
export const LinkToWebsite = styled(LogoWrapper)`
  right: 0px;
  top: 0px;
`;
export const StatLabel = styled.span`
  color: ${({ theme }) => theme.palette.gray['10'].value};
  font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
  margin-top: 6px;
`;
export const StatValue = styled.span`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-weight: ${(props) => props.theme.typography['24 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['24 regular'].fontSize.value}px;
`;
export const MoreButton = styled(Button)`
  width: 100%;
  cursor: pointer;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.gray[40].value};
  font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
  height: 45px;
  display: flex;
  justify-content: center;
  border-radius: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DragIconContainer = styled.div`
  right: 0;
  bottom: 0;
  visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  margin-bottom: -10px;
  margin-right: -10px;
  z-index: 1;
  svg {
    padding-right: 4px;
    padding-bottom: 4px;
  }
`;

export const StatsCalendarContainer = styled.div<MaxLengthProps>`
  display: ${({ minLength }) => minLength ? 'none' : 'flex'};
  flex-direction: column;
  width: ${({ maxLength }) => maxLength ? '50%' : '100%'};
`;

export const InfoContainer = styled.div<MaxLengthProps>`
  display: flex;
  flex-direction: column;
  width: ${({ maxLength }) => maxLength ? '50%' : '100%'};
`;

export const NoDescription = styled.div<MaxLengthProps>`
  min-height: ${({ maxLength }) => maxLength ? '100px' : '60px'};
`;

export const LinkIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #282629;
  height: 52px;
  width: 52px;
  border-radius: 12px;
`;
