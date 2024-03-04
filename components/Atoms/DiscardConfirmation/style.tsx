import styled from 'styled-components';
import { Buttons as DiscardButtons, Container as DiscardModalContainer } from 'components/DiscardModal/styles';
import { DividerComp } from 'components/Divider/styles';

export const Container = styled(DiscardModalContainer)`
  @media screen and (max-width: 768px) {
    bottom: 0;
    position: absolute;
    border-radius: 24px 24px 0 0;
    width: calc(100% - 64px);
    > * {
      text-align: center;
    }
  }
  ${DividerComp} {
    background-color: #282629; // TODO: Add Color
    margin: 24px 0;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  color: ${({ theme }) => theme.palette.white[100].value};
  line-height: 22px;
  > div:first-child {
    line-height: 26px;
    font-weight: 500;
    font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  }
  @media screen and (min-width: 768px) {
    > div:first-child {
      font-size: 24px;
    }
  }
`;
export const Buttons = styled(DiscardButtons)`
  @media screen and (min-width: 768px) {
    button:first-child {
      color: #99e662; // TODO: Add Color
      margin-right: 16px;
    }
  }
  button {
    border-radius: 16px;
  }
  gap: 8px;
  button {
    font-weight: 500;
  }
  button:first-child {
    color: #99e662; // TODO: Add Color
  }
  button:last-child {
    background: rgba(233, 32, 38, 0.15) /* TODO: Add Color */;
    color: ${({ theme }) => theme.palette.red[110].value};
  }
`;
