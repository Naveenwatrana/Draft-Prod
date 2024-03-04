import { getCardSizes } from 'components/DefaultCard/ContentSection/styles';
import { CardSizes } from 'components/DefaultCard/types';
import TextComp from 'components/textComp';
import Link from 'next/link';
import styled from 'styled-components';

type UserNameViewProps = {shrinkText?: boolean, size?: CardSizes};
export const Primary = styled(Link)<UserNameViewProps>`
  font-size: ${({ size }) => (size && getCardSizes(size).primaryFontSize)};
`;

export const UserName = styled(TextComp)<UserNameViewProps>`
  font-size: ${({ size }) => (size && getCardSizes(size).primaryFontSize)};
`;

export const Button = styled.div`
  background: transparent;
  border: none;
  cursor: pointer;
`;
