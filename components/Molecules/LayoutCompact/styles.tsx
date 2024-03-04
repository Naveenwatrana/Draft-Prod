import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  max-height: 100vh;
  overflow-x: hidden;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.palette.white['100'].value};
`;

export const Content = styled.div`
  width:100%;
  height:100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  display: flex;
  justify-content: center;
  gap:36px;
  margin: 4rem 0;
  ::-webkit-scrollbar{
    display: none;
  }
`;
