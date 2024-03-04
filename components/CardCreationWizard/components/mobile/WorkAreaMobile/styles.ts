import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  svg:first-child {
    path {
      stroke: ${({ theme }) => theme.palette.gray[20].value};
    }
  }
`;
