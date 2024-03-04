import styled from 'styled-components';

export default styled.div`
  min-height: 100px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background-color: ${({ theme }) => theme.palette.gray[50].value};
  padding: 24px;
`;

export const DarkGrayContainer = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.gray[60].value};
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;
export type Props = {
  width?: number;
};
export const Gray50Container = styled.div<Props>`
  background: ${({ theme }) => theme.palette.gray[50].value};
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  color: ${({ theme }) => theme.palette.white[100].value};
  border-radius: 12px;
  gap: 8px;
  min-height: 44px;
  display: flex;
  align-items: center;
  padding: 8px;
  width: ${({ width }) => (width ? `${width}px` : 'fit-content')};
  @media screen and (max-width: 768px) {
    overflow-x: auto;
    max-width: calc(100% - 28px);
  }
`;
