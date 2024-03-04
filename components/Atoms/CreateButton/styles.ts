import { ComponentProps } from 'react';
import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';

export const Button = styled(ButtonComp)<ComponentProps<'button'> & {isActive: boolean}>`
    display: flex;
    justify-content: space-between;
    border: 1px solid ${({ theme }) => theme.background.buttonPrimary.default.value};
    border-radius: 8px;
    cursor: pointer;
    align-items: center;
    background-color: ${({ theme: { palette }, isActive }) => isActive ? palette.green[15].value : palette.gray[80].value};
    padding: 12px 16px;
    color: ${({ theme }) => theme.background.buttonPrimary.default.value};
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    transition: 0.3s;
    &:hover {
        background-color: ${({ theme }) => theme.palette.green[15].value};
    }
`;
export const Text = styled.span`
    margin-right: 32px;
`;
