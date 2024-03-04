import { DividerComp } from 'components/Divider/styles';
import { FeedContainer } from 'pages/feed/styles';
import styled from 'styled-components';

export const MoreLikeThisText = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  text-align: center;
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  padding-top: 36px;
  margin-bottom: 14px;
`;

export const Container = styled.div`
  margin-top: 135px;
  ${FeedContainer} {
    margin: 0;
  }
  ${DividerComp} {
    position: absolute;
    left: 0;
    width: 100%;
  }
`;
