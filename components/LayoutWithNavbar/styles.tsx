import styled from 'styled-components';

type ContentProps = {
  showNavbar?: boolean;
};

export const Container = styled.div`
  background-color: ${(props) => props.theme.palette.gray[80].value};
  color: ${(props) => props.theme.palette.white[100].value};
`;

export const Content = styled.div<ContentProps>`
  ${({ showNavbar }) => showNavbar
    && `
  margin-top: 66px;
  margin-bottom: 87px;
  min-height: calc(100vh - 153px);
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: 1024px) {
    margin-top: 66px;
    margin-bottom: 0;
    min-height: calc(100vh - 66px);
  }
  `}
`;
