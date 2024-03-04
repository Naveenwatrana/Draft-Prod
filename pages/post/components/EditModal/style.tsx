import styled from 'styled-components';
import { Container as DiscardModalContainer } from 'components/DiscardModal/styles';
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
  color: ${({ theme }) => theme.palette.white[100].value};
  line-height: 26px;
  line-height: 26px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  margin-bottom: 16px;
  svg {
    position: absolute;
    right: 16px;
    top: 16px;
    height: 12px;
  }
`;

export const Button = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px;
`;

export const StyledButtonLabel = styled.div`
  line-height: 18px;
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  color: #99e662; // TODO: Add Color
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${Button}:last-child ${StyledButtonLabel} {
    color: ${({ theme }) => theme.palette.red[100].value}; // TODO: Add Color
  }
`;
