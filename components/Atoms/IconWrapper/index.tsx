import styled from 'styled-components';

export type IconWrapperProps = {
  bg?: string;
  border?: string;
  primary?: boolean;
};

export const IconWrapper = styled.button<IconWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    cursor: pointer;
    padding: 0 10px;
    gap: 6px;
    background: ${({ bg }) => bg ? bg : 'none'};
    border: 1px solid ${({ border, theme }) => border ? border : theme.palette.gray[40].value};
    border-radius: 16px;
    ${({ primary, theme }) => primary && `
      background: ${theme.palette.green[100].value};
      color: ${theme.palette.gray[60].value};
      & > * {
        color: ${theme.palette.gray[60].value};
        fill: ${theme.palette.gray[60].value};
        stroke: ${theme.palette.gray[60].value};
      }
      & > svg > path {
        color: ${theme.palette.gray[60].value};
        fill: ${theme.palette.gray[60].value};
        stroke: ${theme.palette.gray[60].value};
      }
    `}
    
    &:hover {
        outline: 1px solid ${({ theme }) => theme.palette.gray[40].value};
        background: ${({ theme }) => theme.palette.gray[60].value};
        //FIXME: use color from theme. Currently, there is no color with this value in the theme

        //FIXME: use color from theme. Currently, there is no color with this value in the theme
    }
`;
