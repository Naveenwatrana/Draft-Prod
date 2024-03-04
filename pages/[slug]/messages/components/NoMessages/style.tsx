import { SubTitle } from 'pages/messages/style';
import styled from 'styled-components';

export const NoMessagesContainer = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 156px;
  width: 100%;
  @media screen and (max-width: 1023px) {
    margin-top: 0;
  }
`;

export const NoMessageSubTitle = styled(SubTitle)`
  line-height: 24px;
`;
