import styled from 'styled-components';

export const FilledButtonIcon = styled.div`
  background: ${({ theme }) => theme.palette.green['80'].value};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px;
  width: 22px;
  &:hover {
    background: ${({ theme }) => theme.palette.green['100'].value};
  }
`;
