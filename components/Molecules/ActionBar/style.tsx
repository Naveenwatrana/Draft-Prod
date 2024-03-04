import { Gray50Container } from 'components/Atoms/GrayContainer';
import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const Logo = styled.div`
  padding: 4px 12px 4px 16px;
`;
export const ActionButtons = styled(ButtonComp)`
  padding-left: 16;
  padding-right: 16;
`;

export const ActionSectionContainer = styled.div`
  width: fit-content;
  align-self: center;
  background: ${({ theme }) => theme.palette.gray[50].value};
  border-radius: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  position: fixed;
  bottom: 16px;
  z-index: 2;
`;

export const SecondaryButton = styled(ButtonComp)`
  border: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  padding: 16px 16px;
  color: ${({ theme }) => theme.palette.gray[100].value};
  display: flex;
  gap: 4px;
  border-radius: 16px;

  background: ${({ theme }) => theme.palette.green[100].value};
`;

export const Container = styled(Gray50Container)`
  position: fixed;
  bottom: 10px;
`;
