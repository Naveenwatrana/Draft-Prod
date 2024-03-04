import styled from 'styled-components';

export type ButtonProps = {
    active?: boolean;
};

export const Button = styled.button<ButtonProps>`
    background-color: transparent;
    border: 1px solid ${({ theme, active }) => active ? theme.palette.gray['40'].value : 'transparent'};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    padding: 6px;
    border-radius: 8px;
    &:hover {
        border-color: ${({ theme }) => theme.palette.gray['40'].value};
        background-color: ${({ theme }) => theme.palette.gray['50'].value};
    }
`;
