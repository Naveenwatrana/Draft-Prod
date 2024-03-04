import styled from 'styled-components';

type StepProp = {
  active: boolean;
};

export const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 100%;
  height: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
`;

export const CreateCompanyText = styled.span`
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.white['100'].value};
  display: flex;
  align-items: center;
  gap: 13px;
  svg path {
    stroke: ${({ theme }) => theme.palette.gray['20'].value};
    cursor: pointer;
  }
  svg {
    cursor: pointer;
  }
`;

export const StepsContainer = styled.span`
  display: flex;
  align-items: center;
  width: 75%;
  justify-content: center;
  gap: 24px;
  @media screen and (max-width: 555px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 16px;
  }
`;
export const StepsCount = styled.span`
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  border-radius: 40px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px ${({ theme }) => theme.palette.gray['50'].value};
`;

export const Step = styled.span<StepProp>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.palette.gray['30'].value};
  span:first-child {
    background-color: ${({ theme, active }) => active && theme.palette.white['100'].value};
    color: ${({ theme, active }) => active && theme.palette.gray['60'].value};
  }
  span:last-child {
    color: ${({ theme, active }) => active && theme.palette.white['100'].value};
  }
`;

export const StepName = styled.span`
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
`;
