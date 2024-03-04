import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  height: max-content;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const OnBoardingMainBody = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
  margin: 0;
  flex: 1;
  display: flex;

  @media screen and (max-width: 1023px) {
    padding: 23px 23px 50px 23px;
  }
`;

export const OnBoardingMainBodyPageText = styled.span`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.white['100'].value};
  display: flex;
  align-items: center;
  gap: 13px;
  svg path {
    stroke: ${({ theme }) => theme.palette.gray['20'].value};
    cursor: pointer;
    stroke-width: 1.5;
  }
  svg {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  line-height: 28px;
  padding: 16px;
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  `;

export const StepsContainer = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  /* overflow-x: scroll; */
  border-bottom: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
