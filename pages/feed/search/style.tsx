import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.palette.gray[80].value};
  color: ${({ theme }) => theme.palette.white[100].value};
  overflow-y: scroll;
`;

export const SearchingWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 24px 16px;
  gap: 24px;
  align-items: center;
  color: ${({ theme }) => theme.palette.white[100].value};
  > svg > path {
    stroke: ${({ theme }) => theme.palette.gray['20'].value};
    stroke-width: 1;
  }
  > svg:first-child {
    cursor: pointer;
  }
`;

export const SearchContainer = styled.div`
  width: 65%;
  position: relative;
`;

export const SearchInput = styled.input`
  line-height: 24px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  border-radius: 8px;
  padding: 17.5px;
  background: ${({ theme }) => theme.palette.gray['100'].value};
  color: ${({ theme }) => theme.palette.white['100'].value};
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  width: 100%;
  padding-left: 40px;
  width: 100%;
  &:focus {
    outline-color: ${({ theme }) => theme.palette.gray['40'].value};
  }
`;
