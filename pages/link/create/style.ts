import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 65px;
  width: 100%;
  height: calc(100% - 65px - 73px);
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
`;
export const Graphic = styled(Image)`
  height: auto;
`;
export const Page = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  height: 100vh;
`;
