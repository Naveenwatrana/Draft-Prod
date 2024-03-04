import styled, { keyframes } from 'styled-components';

export const CreateCompanyContainer = styled.form`
  background-color: ${(props) => props.theme.palette.gray['80'].value};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px;
  border-radius: 4px;
  max-width: 733px;
  margin: 0 auto;
  width: 733px;
  @media (max-width: 988px) {
    width: auto;
    max-width: none;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 8px;
  }
`;

export const Title = styled.div`
  font-size: ${(props) => props.theme.typography['24 semibold'].fontSize.value}px;
  font-weight: ${(props) => props.theme.typography['24 semibold'].fontWeight};
  color: ${(props) => props.theme.palette.white['100'].value};
  margin-bottom: 24px;
`;

export const SubTitle = styled.div`
    font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
    font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
    color: ${(props) => props.theme.palette.gray['10'].value};
    margin-bottom: 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px 0 32px 0;
`;

export const ButtonSubmit = styled.div`
  width: 184px;
`;

export const ButtonCancel = styled.div`
  background: none;
  margin-right: 36px;
  display: flex;
  align-items: center;
`;

export const CompanyBody = styled.div`
  padding-top: 32px;
  width: 555px;
  @media screen and (max-width: 555px) {
      width: 100%;
      padding-top: 24px;
  }
`;

export const CompanyDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  padding: 10px 0;
`;

export const LoadingText = styled.div`
  font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
  color: ${(props) => props.theme.palette.gray['30'].value};
  margin-top: 16px;
`;

const lodingSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingCompany = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${lodingSpin} infinite 4s linear;
  }
`;

export const CompanyLogo = styled.img`
  border-radius: 12px;
  width: 100px;
  height: 100px;
`;

export const CompanyQuestion = styled.div`
  font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
  font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
  color: ${(props) => props.theme.palette.white['100'].value};
  padding: 24px 0;
`;

export const CompanySubDesc = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
  color: ${(props) => props.theme.palette.gray['10'].value};
`;

export const CompanyButtonGroup = styled.div`
  margin-top:24px;
  display: flex;
  gap: 24px;
`;

export const CompanyButtonWrapper = styled.div`
  padding: 12px 16px;
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  `;

export const CreateCompanyBody = styled.div`
  margin: 4rem 0;
  min-height: calc(100vh - 129px);
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
`;

export const Buttons = styled.div`
  display: flex;
  position: fixed;
  bottom: -4px;
  right: 8px;
  @media screen and (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    width: calc(100% - 32px);
    right: 0;
    button {
      width: 50%;
    }
  }
  flex-direction: column-reverse;
  padding: 16px;
  margin-top: 10px;
  gap: 16px;
  flex-direction: row;
  justify-content: end;
  button:last-child {
    padding: 12px 16px;
    width: 169px;
  }
`;

export const WordCounterWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
