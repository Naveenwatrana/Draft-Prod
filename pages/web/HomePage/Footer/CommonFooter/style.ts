import styled from 'styled-components';

export const FooterSection = styled.div`
  display: flex;
  border-top: 1px solid #202020;
  padding: 14px 0;
  margin-top: 220px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 910px) {
    display: none;
  }
  p {
    a {
      color: ${({ theme }) => theme.palette.green[100].value};
    }
  }
  & ul {
    display: flex;
    li {
      padding: 10px;
      &::marker {
        content: none;
      }
    }
  }
`;
