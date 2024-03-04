import { DividerComp, StyledDivider } from 'components/Divider/styles';
import styled from 'styled-components';

export const ItemContainer = styled.div`
  position: relative;
  ${DividerComp} {
    margin-top: 24px;
  }
  ${StyledDivider} {
    margin-top: -24px;
    position: absolute;
  }
`;
