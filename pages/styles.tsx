import { createGlobalStyle } from 'styled-components';

type GlobalStyleProps = {
    defaultFont: string;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    font-family: ${({ defaultFont }) => defaultFont};
  }
`;
