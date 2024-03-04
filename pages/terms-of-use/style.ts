import styled from 'styled-components';

export const TermsOfUseWrapper = styled.div`
  padding-top: 130px;
  background: ${({ theme }) => theme.palette.gray[80].value};
  & a {
    color: ${({ theme }) => theme.palette.green[100].value};
  }
`;
export const H1 = styled.h1`
  font-family: ${({ theme }) => theme.homePageFont};
`;
export const H2 = styled.h2`
  font-family: ${({ theme }) => theme.defaultFont};
  margin-top: 20px;
`;
export const H3 = styled.h3`
  margin-top: 20px;
`;
export const H4 = styled.h4`
margin-top: 20px;
font-size: 20px;
`;
export const ParagraphTitle = styled.p`
  margin: 30px 0 0;
  font-weight: bold;
`;
export const UnorderedList = styled.ul`
  margin: 30px 0;
  margin-left: 15px;
`;
export const SubList = styled.ul`
  margin-left: 15px;
  padding-left: 30px;
`;

export const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }
`;
