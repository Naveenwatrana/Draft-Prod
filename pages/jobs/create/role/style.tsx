import { Span } from 'components/textComp/styles';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 550px;
  padding: 60px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  font-family: ${({ theme }) => theme.defaultFont};
  flex-shrink: 0;
  height: max-content;
  @media screen and (max-width: 1023px) {
    width: auto;
    padding: 24px 4px 88px;
    height: calc(100vh - 258px);
    overflow-y: auto;
    margin-top: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${Span} {
    align-self: flex-end;
  }
`;

export const Heading = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  line-height: 36px;
`;

export const SubHeading = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: 400;
  line-height: 26px;
`;

export const SubHeadingPopup = styled(SubHeading)`
  color: ${({ theme }) => theme.palette.white[100].value};
  line-height: 20px;
`;

export const SpecificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: linear-gradient(
        ${({ theme }) => theme.palette.gray[80].value},
        ${({ theme }) => theme.palette.gray[80].value}
      )
      padding-box,
    linear-gradient(
        90deg,
        rgba(250, 161, 67, 0.5) 0%,
        rgba(84, 171, 172, 0.5) 115.39%
      )
      border-box;
  border-radius: 12px;
  border: 1px solid transparent;
`;

export const SpecifyText = styled.div`
  flex: 1 0 0;
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  line-height: 20px;
  b {
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  }
`;

export const BoldText = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  line-height: 20px;
`;

export const FindRoleTxt = styled.div`
  color: ${({ theme }) => theme.palette.green[80].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  position: fixed;
  bottom: -4px;
  right: 0;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  @media screen and (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    width: calc(100% - 32px);
    right: 0;
    button {
      width: 50%;
    }
    gap: 24px;
  }
  border-top: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  flex-direction: column-reverse;
  padding: 16px;
  margin-top: 10px;
  gap: 16px;
  flex-direction: row;
  justify-content: end;
  button:last-child {
    padding: 12px 16px;
    width: 169px;
    :disabled {
      background: rgba(104, 225, 116, 0.15); // TODO: Add color
      color: ${({ theme }) => theme.palette.gray[80].value};
    }
  }
  button:first-child {
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  width: 441px;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[80].value};
  button:last-child {
    align-self: flex-end;
  }
`;

export const ContactUsContainer = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[60].value};
  span:first-child {
    color: ${({ theme }) => theme.palette.white[100].value};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    line-height: 20px;
  }
  a:last-child {
    color: ${({ theme }) => theme.palette.green[100].value};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    line-height: 20px;
  }
`;
