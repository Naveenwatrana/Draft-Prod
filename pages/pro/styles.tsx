import { Card } from 'components/DefaultCard/styles';
import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';
import { DetailsContainerProps } from './types';

type IconContainerProps = {
  contained?: boolean;
}

export const Spacing = styled.div`
    margin: 18px 0;
    display: flex;
    width: 100%;
`;
export const Title = styled.span`
    font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
`;

export const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const EditIcon = styled.span`
    font-weight: ${(props) => props.theme.typography['12 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
    margin-left: 9px;
`;
export const Buttons = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top: 10px;
    button {
      max-width: 184px;
    } 
    button:last-child {
      width: 100%;
    }
    @media screen and (min-width: 768px) {
      flex-direction: row;
      justify-content: end;
      gap: 12px;
    }
    gap: 24px;
`;

export const SaveButton = styled(ButtonComp)`
    @media screen and (min-width: 768px) {
        margin-left: 32px;
        padding-left: 69px;
        padding-right: 69px;
    }
    :disabled {
      background: rgba(104, 225, 116, 0.15); // TODO: Add color
      color: ${({ theme }) => theme.palette.gray[80].value};
    }
`;

export const ProfilePage = styled.div`  
  background: ${({ theme }) => theme.palette.gray[80].value};
  min-height: 100vh;
  @media screen and (max-width: 1023px) {
    overflow-y: auto;
    overflow-x: hidden;
  }
  align-items: center;
  display: flex;
  flex-direction: column;
  svg:last-child {
    align-self: center;
  }
`;
export const ContainerWrapper = styled.div`
  padding: 62px 93px 0 141px;
  min-height: calc(100vh - 118px);
  max-width: 1164px;
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.palette.gray[80].value};
  display: flex;
  max-width: 1164px;
  gap: 24px;
  margin: 0 auto;
  width: 100%;
  @media screen and (max-width: 1023px) {
    max-height: 100%;
    flex-direction: column;
    padding: 0;
    ${Card} {
      width: 100%;
    }
  }
  `;

export const DetailsContainer = styled.div<DetailsContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (min-width: 1023px) {
    max-height: calc(100vh - 76px);
    min-width: ${({ minWidth }) => minWidth || 600}px;
    padding-bottom: 18px;
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  gap: ${({ isResponsiveContainer }) => isResponsiveContainer ? '8px' : '0'};
  margin-top: ${({ isResponsiveContainer }) => isResponsiveContainer ? '0px' : '7px'};
  padding: 8px -1px 0;
  @media screen and (min-width: 1023px) {
    padding-right: 50px;
  }
  .react-grid-item.react-grid-placeholder {
    background-color: ${({ theme }) => theme.palette.violet[80].value};
    border-radius: 14px;
  }
`;

export const NoDetailsContainer = styled(DetailsContainer)`
  @media screen and (min-width: 1023px) {
    padding-right: 0px;
  }
`;

export const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1023px) {
    padding-bottom: 6rem;
  }
  `;

export const IconsContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  right: -3rem;
  cursor: pointer;
  display: none;
  padding-bottom: 2rem;
  align-items: center;
  gap: 8px;
  flex-direction: column;
  padding-left: 2rem;
`;

export const MobileIconsContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 16px;
  z-index: 12;
  background: ${({ theme }) => theme.palette.gray[50].value};
  padding: 8px;
  gap: 4px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
`;

export const IconContainer = styled.div<IconContainerProps>`
  flex-direction: row;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  padding: 12px;
  gap: 8px;
  background: ${({ theme, contained }) => contained ? theme.palette.green['80'].value : theme.palette.gray['50'].value};
  @media screen and (min-width: 1023px) {
    border: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  }
  border-radius: 12px;
  svg path {
    stroke: ${({ theme, contained }) => contained && theme.palette.gray['40'].value};
  }
  max-width: max-content;
`;

export const ActionIconsContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  right: -7rem;
  cursor: pointer;
  display: none;
  padding-bottom: 2rem;
  align-items: center;
  gap: 8px;
  flex-direction: column;
  padding-left: 2rem;
  align-items: flex-start;
`;

export const ActionIconContainer = styled.div<IconContainerProps>`
  flex-direction: row;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  padding: 12px;
  gap: 8px;
  background: ${({ theme }) => theme.palette.gray['50'].value};
  border: solid 1px ${({ theme }) => theme.palette.gray['40'].value};
  border-radius: 12px;
  svg path {
    stroke: ${({ theme, contained }) => contained && theme.palette.gray['40'].value};
  }
  h6 {
    color: ${({ theme }) => theme.palette.green[100].value};
  }
  text-transform: uppercase;
  min-width: max-content;
`;

export const ActionDeleteIconContainer = styled(ActionIconContainer)`
  background: rgba(226, 35, 26, 0.15); // TODO add color
  h6 {
    color: ${({ theme }) => theme.palette.red[110].value};
  }
  @media screen and (min-width: 1023px) {
    border: 1px solid rgba(226, 35, 26, 0.15); // TODO add color
  }
`;
