import { getCardSizes } from 'components/DefaultCard/ContentSection/styles';
import styled, { css } from 'styled-components';
import { LinkButtonProps } from './types';

export const LinkButtonStyles = css<LinkButtonProps>`
  background: ${({ theme }) => theme.palette.white[100].value};
  border: 1px solid rgba(255, 255, 255, 0.12); //TODO: Get color from theme
  border-radius: ${({ size }) => (size ? getCardSizes(size).borderRadius : '8px')};
  color: black;
  padding: ${({ size }) => (size ? getCardSizes(size).padding : '10px')};
  text-align: center;
  font-size: ${({ size }) => (size ? getCardSizes(size).fontSize : '1em')};
  font-weight: 600;
  height: ${({ size }) => (size ? getCardSizes(size).height : '18.5px')};
`;

export const LinkButton = styled.a`
  ${LinkButtonStyles}
`;

export const LinkButtonText = styled.div`
  ${LinkButtonStyles}
`;
