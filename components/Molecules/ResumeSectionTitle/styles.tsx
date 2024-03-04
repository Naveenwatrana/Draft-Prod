import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
  > svg {
    cursor: pointer;
    path {
      stroke: ${({ theme }) => theme.palette.green[100].value};
    }
  }
  h3 {
    display: flex;
    align-items: center;
  }
`;

export const StatusTag = styled.span`
  display: inline-block;
  background: rgba(104, 225, 116, 0.15);
  margin-left: 16px;
  border-radius: 8px;
`;
export const StatusInner = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 11px;
  width: 76px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 2px 12px;
  text-transform: uppercase;
`;
