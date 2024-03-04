import TextComp from 'components/textComp';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

export const AuthorName = styled(TextComp)`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
`;

export const PublishInfo = styled(TextComp)`
  font-size: 12px;
  font-weight: 300;
  
  //FIXME: use color from theme. Currently, there is no color with this value in the theme
  color: #A9ABAB; 
`;
