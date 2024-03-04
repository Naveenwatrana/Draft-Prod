import { Card } from 'components/DefaultCard/styles';
import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.palette.gray[80].value};
    width: 410px;
    border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    border-width: 0 1px 1px 1px;
    position: absolute;
    z-index: 90;
    height: calc(100vh - 68px);
    overflow-y: auto;
    overflow-x: hidden;
    @media (max-width: 420px) {
        position: fixed;
        left: 0;
        margin-left: 0;
    }
`;
export const Title = styled.div`
    padding: 24px 27px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: calc(100% - 48px);
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray[40].value};
`;
export const Heading = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
`;
export const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 60px;
`;
export const ListItem = styled.div`
    background-color: ${({ theme }) => theme.palette.gray[80].value};
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    padding: 24px;
    width: calc(100% - 48px);
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.palette.gray[50].value};
    }
    > span:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > div {
            display: flex;
            flex-direction: column;
        }
    }
    ${Card} {
        margin: 16px 0;
    }
`;
export const NotificationText = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
    & > span {
        font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
    };
`;
export const NotificationTime = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
`;

export const AllNotificationsButton = styled(ButtonComp)`
  background-color: ${({ theme }) => theme.palette.gray[50].value};
  border-radius: 0;
  width: 410px;
  padding: 8px 7px;
  height: 60px;
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  position: absolute;
  bottom: 0;
  right: 0;
  @media (max-width: 1023px) {
    bottom: 108px;
    width: calc(100% - 1rem);
    left: 0;
  }
`;
