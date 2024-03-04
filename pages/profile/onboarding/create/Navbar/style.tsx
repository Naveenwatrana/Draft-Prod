import { SteppersContainer } from 'components/Stepper/style';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: calc(100% - 32px);
  height: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  ${SteppersContainer} {
    flex: 2;
    position: absolute;
    width: 100%;
    justify-content: center;
  }
`;

export const BackText = styled.span`
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.white['100'].value};
  display: flex;
  align-items: center;
  gap: 13px;
  flex: 2;
  cursor: pointer;
  z-index: 1;
  `;

export const ClippedUserName = styled.span`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
`;

export const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray['40'].value};
  }
`;
