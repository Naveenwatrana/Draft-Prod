import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  width: 50%;
  height: calc(100vh - 132px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    width: 555px;
  }
  .select__control {
    padding-bottom: 0;
  }
  > div {
    margin-top: 16px;
  }
  > div:first-child {
    margin-top: 40px;
    margin-bottom: 3px;
  }
  > h6 {
    margin-top: 16px;
    margin-bottom: -12px;
  }
  @media screen and (max-width: 555px) {
    width: 100%;
    > * {
      width: 100%;
    }
    > div:first-child {
      margin-bottom: 32px;
      z-index: 1;
    }
    height: calc(100vh - 156px);
  }
`;

export const CardsContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[60].value};
  width: 50%;
  min-height: calc(100vh - 130px);
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

export const InputField = styled.div`
    margin-top: 24px;
`;
