import styled from 'styled-components';
import { DividerComp as Divider } from 'components/Divider/styles';

export const Container = styled.div`
  display: flex;
  width: 634px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  ${Divider} {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const Card = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.palette.gray['40'].value};
  background: ${(props) => props.theme.palette.gray['60'].value};
  overflow: hidden;
  position: relative;
  > svg {
    position: absolute;
    height: inherit;
    left: -24px;
    top: -24px;
  }
`;
