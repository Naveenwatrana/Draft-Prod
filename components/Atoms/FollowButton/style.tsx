import ButtonComp from 'components/buttonComp';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import styled from 'styled-components';

export const FollowingButton = styled(ButtonComp)`
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  color: ${({ theme }) => theme.palette.gray[10].value};
  padding: 8px;
  line-height: 20px;
  height: 44px;
  min-width: 89px;
`;

export const StyledFollowButton = styled(ButtonComp)`
  border-radius: 8px;
  padding: 8px;
  line-height: 20px;
  height: 44px;
  min-width: 89px;
`;

export const Tooltip = styled(ReactTooltip)`
  background-color: ${({ theme }) => theme.palette.white[100].value};
  color: ${({ theme }) => theme.palette.gray[80].value};
  border-radius: 4px;
  opacity: 1;
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
`;
