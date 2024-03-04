import styled from 'styled-components';

export const IconWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    cursor: pointer;
    padding: 0 10px;
    gap: 6px;
    background: none;
    border: none;
    
    &:hover {
        outline: 1px solid ${({ theme }) => theme.palette.gray[40].value};
        background: ${({ theme }) => theme.palette.gray[60].value};
        border-radius: 8px;
        //FIXME: use color from theme. Currently, there is no color with this value in the theme

        //FIXME: use color from theme. Currently, there is no color with this value in the theme
    }
`;

export const Count = styled.span`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
`;
