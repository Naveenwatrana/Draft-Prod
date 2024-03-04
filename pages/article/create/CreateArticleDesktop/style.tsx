import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;
