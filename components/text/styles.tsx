import TextComp from 'components/textComp';
import styled from 'styled-components';

export const BoldText = styled(TextComp)`
  font-weight: bold;
  font-family: ${({ theme }) => theme.defaultFont};
`;
export const TextComponent = styled.p`
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-family: ${({ theme }) => theme.typography['16 regular'].fontFamilies.value};
`;
