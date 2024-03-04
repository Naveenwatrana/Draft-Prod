import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  width: 100%px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1;
  padding: 4px;
  @media (min-width: 1024px) {
    padding: 42px 72px;
    margin-left: 240px;
  }
  .infinite-scroll-component__outerdiv {
    align-self: center;
  }
`;

export const AtsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1;
  padding: 4px;
  @media (min-width: 1024px) {
    padding: 42px 72px;
    margin-left: 240px;
  }
  .infinite-scroll-component__outerdiv {
    align-self: center;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: center;
`;

export const StyledButton = styled(ButtonComp)`
  :disabled {
    background: rgba(104, 225, 116, 0.15); // TODO: Add color
    color: ${({ theme }) => theme.palette.gray[80].value};
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 1rem;
  min-width: 906px;
  @media (max-width: 1024px) {
      min-width: max-content;
      grid-template-columns: repeat(2, auto);
  }
  @media (max-width: 658px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 100px;
  }
`;

export const SettingCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border-radius: 16px;
  background-color: #1F1D20;
  width: 100%;
  max-width: 906px;
`;

export const SettingCardHeader = styled.div`
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.palette.white[100].value};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SettingText = styled.span`
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.palette.gray[10].value};
  max-width: 906px;
`;

export const SettingPrimaryButton = styled.button`
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  border: 1px solid ${({ theme }) => theme.palette.green[80].value};
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.white[100].value};
  padding: 16px;
  border-radius: 16px;
  width: fit-content;
  background: transparent;
  cursor: pointer;
`;

export const SettingErrorButton = styled.button`
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  border: none;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.red[100].value};
  padding: 16px;
  border-radius: 16px;
  width: fit-content;
  background: ${({ theme }) => theme.palette.red[90].value};;
  cursor: pointer;
`;

export const AccordianContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 906px;
`;

export const Accordian = styled.div`
  width: 100%;
  background-color: #1F1D20;
  padding: 24px;
  border-radius: 16px;
`;

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const AccordianHeader = styled.div<{active?: boolean}>`
  display: flex;
  gap: 8px;
  align-items: center;
  span:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    font-size: 14px;
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    background-color:  ${(props) => props.active ? ({ theme }) => theme.palette.green[80].value : 'auto'};
    line-height: 18px;
    border-radius: 50%;
    color: ${(props) => props.active ? ({ theme }) => theme.palette.gray[80].value : 'auto'};
    border: 1px solid #282629;
  }
  span:nth-child(2){
    color: ${(props) => props.active ? ({ theme }) => theme.palette.green[80].value : 'auto'};
    font-size: 14px;
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  }
`;

export const AccordianPoint = styled.div`
  font-size: 16px;
  line-height: 22px;
  a {
    color: ${({ theme }) => theme.palette.white[100].value};
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export const AccordianBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color:  ${({ theme }) => theme.palette.gray[50].value};
`;

export const BlockElement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BlockElementHeader = styled.div`
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  color: ${({ theme }) => theme.palette.gray[10].value};
  line-height: 16px;
`;

export const ErrorText = styled.div`
  color: red;
`;

export const SuccessBedge = styled.span`
  background-color: #A5F1BA40;
  font-weight: 500;
  font-size: 11px;
  line-height: 18px;
  padding: 4px 6px 4px 6px;
  border-radius: 99px;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CopyText = styled.div`
  color: ${({ theme }) => theme.palette.green[80].value};
  content: 'Copy';
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  cursor: pointer;
`;
