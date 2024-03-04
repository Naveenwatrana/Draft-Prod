import { CustomInput } from 'components/inputComp/styles';
import styled from 'styled-components';

export const DraftUrlContainer = styled.div`
  position: relative;
  ${CustomInput} {
    padding-left: 122px;
  }
`;

export const DraftUrlPath = styled.span`
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
  color: ${({ theme }) => theme.palette.white[100].value};
  position: absolute;
  top: 34px;
  left: 12px;
`;
