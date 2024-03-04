import styled from 'styled-components';

export const ActionSectionContainer = styled.div`
  width: fit-content;
  align-self: center;
  background: ${({ theme }) => theme.palette.gray[50].value};
  padding: 8px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  display: flex;
  gap: 8px;
  align-items: center;
  position: fixed;
  bottom: 16px;
  z-index: 2;
`;
