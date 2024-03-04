import styled, { css } from 'styled-components';
import { Theme } from 'common/utils/tokenConverter/types';
import { ColorScheme } from 'components/textComp/types';

const colorValue = (theme: Theme, scheme: ColorScheme) => {
  switch (scheme) {
    case 'dark':
      return theme.palette.white['80'].value;
    case 'grey':
      return theme.palette.gray['50'].value;
    case 'error':
      return theme.palette.red['100'].value;
    case 'light':
    default:
      return theme.palette.white['100'].value;
  }
};

export const BaseText = css<{colorScheme: ColorScheme, textBold: boolean}>`
  font-family: ${({ theme }) => theme.defaultFont};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme, textBold }) => textBold ? '600' : theme.typography['14 regular'].fontWeight};
  margin: 0;
  color: ${({ theme, colorScheme }) => colorScheme ? colorValue(theme, colorScheme) : colorValue(theme, 'light')};
`;

export const Span = styled.span`
  ${BaseText};
  font-weight: 400;
`;

export const Div = styled.div`
  ${BaseText};
  font-weight: 600;
`;

export const P = styled.p`
  ${BaseText};
  font-weight: 400;
`;

export const Paragraph = styled.p`
  ${BaseText};
`;

export const H1 = styled.h1`
  ${BaseText};
  font-size: ${({ theme }) => theme.typography['32 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['32 semibold'].fontWeight};
`;

export const H2 = styled.h2`
  ${BaseText};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
`;

export const H2Small = styled.h2`
  ${BaseText};
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
`;

export const H3 = styled.h3`
  ${BaseText};
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
`;

export const H4 = styled.h4`
  ${BaseText};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
`;

export const H5 = styled.h5`
  ${BaseText};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
`;

export const H6 = styled.h6`
  ${BaseText};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
`;

export const pAlt = styled.p`
  ${BaseText};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
`;
