import styled from 'styled-components';
import { ButtonFixedProps, ButtonSize, StyledButtonProps } from 'components/buttonComp/types';

const styleValues = (size: ButtonSize) => {
  let fontSize: string;
  let padding: string;

  switch (size) {
    case 'small':
      fontSize = '12px';
      padding = '8px 16px';
      break;
    case 'large':
      fontSize = '20px';
      padding = '16px 32px';
      break;
    case 'medium':
    default:
      fontSize = '16px';
      padding = '12px 24px';
  }

  return { fontSize, padding };
};

const baseButton = styled.button<StyledButtonProps>`
  font-family: ${({ theme }) => theme.defaultFont};
  font-size: ${({ size }) => size ? styleValues(size).fontSize : styleValues('medium').fontSize};
  padding: ${({ size }) => size ? styleValues(size).padding : styleValues('medium').padding};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  font-weight: 600;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  &[disabled] {
    opacity: 1;
    background: ${({ theme }) => theme.palette.gray[40].value};
    color: ${({ theme }) => theme.palette.gray[60].value};
    pointer-events: none;

    &:hover {
      background: ${({ theme }) => theme.palette.gray[40].value};
      color: ${({ theme }) => theme.palette.gray['80'].value};
    }
  }
`;

export const PrimaryButton = styled(baseButton)`
  color: ${({ theme }) => theme.palette.violet['100'].value};
  background-color: ${({ theme }) => theme.palette.green['80'].value};

  &:hover {
    background-color: ${({ theme }) => theme.palette.green['100'].value};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.palette.green['80'].value};
    opacity: 0.2;
  }
`;
export const ErrorButton = styled(baseButton)`
  color: ${({ theme }) => theme.palette.red['100'].value};
    background-color: ${({ theme }) => theme.palette.red['90'].value};

    &:hover {
      background-color: ${({ theme }) => theme.palette.red['80'].value};
    }
`;

export const SecondaryButton = styled(baseButton)`
  color: ${({ theme }) => theme.palette.white['100'].value};
  background-color: ${({ theme }) => theme.palette.violet['100'].value};
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
`;

export const LinkButton = styled(baseButton)`
  color: ${({ theme, error }) => error ? theme.palette.red['100'].value : theme.palette.green['80'].value};
  background-color: transparent;
  box-shadow: none;
  padding: 0;

  &:hover {
    color: ${({ theme, error }) => error ? theme.palette.red['80'].value : theme.palette.green['100'].value};
  }

  &[disabled] {
    color: ${({ theme }) => theme.palette.gray['60'].value};
    background-color: transparent;
    pointer-events: none;

    &:hover {
      color: ${({ theme }) => theme.palette.gray['70'].value};
    }
  }
`;

export const PrimaryGradientButton = styled(PrimaryButton)`
  background: radial-gradient(
    75.71% 102.64% at 52.77% 142.1%,
    ${({ theme }) => theme.palette.teal[100].value} 0%,
    ${({ theme }) => theme.palette.green[100].value} 100%
  ); // TODO: Add Color
  height: 44px;
  :disabled {
    background: rgba(104, 225, 116, 0.15); // TODO: Add color
    color: ${({ theme }) => theme.palette.gray[80].value};
  }
  `;

export const Buttons = styled.div`
  display: flex;
  width: 100%;
  padding-top: 16px;
  padding-right: 16px;
  justify-content: flex-end;
  button {
    height: 44px;
    max-width: 184px;
  }
  button:last-child {
    width: 100%;
    :disabled {
      background: rgba(104, 225, 116, 0.15); // TODO: Add color
      color: ${({ theme }) => theme.palette.gray[80].value};
    }
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: end;
    gap: 32px;
  }
  gap: 24px;
`;

export const ButtonsFixed = styled(Buttons)<ButtonFixedProps>`
  position: fixed;
  bottom: 0;
  right: 0;
  width: ${({ width }) => width || '100%'};
  border-top: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  padding-bottom: 16px;
`;

export const MobileFixButtons = styled.div`
  position: fixed;
  bottom: 0;
  padding: 12px;
  height: 44px;
  display: flex;
  align-items: center;
  z-index: 5;
  border-top: solid;
  width: calc(100% - 24px);
  border-top: 1px solid #2a282b; // TODO: Add Color
  background: ${({ theme }) => theme.palette.gray[80].value};
  left: 0;
`;

export const FixButton = styled.div`
  color: #99e662; // TODO: Add color
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: 500;
  line-height: 18px;
  width: 50%;
  text-align: center;
`;
