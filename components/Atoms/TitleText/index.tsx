import TextComp from 'components/textComp';
import styled from 'styled-components';

export const TitleText = styled(TextComp)`
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  line-height: ${({ theme }) => theme.typography['24 semibold'].lineHeights.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
`;
