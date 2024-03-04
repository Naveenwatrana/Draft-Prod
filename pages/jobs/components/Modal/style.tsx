import styled from 'styled-components';

export const ModalSubHeader = styled.div`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
`;

export const RadioButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
