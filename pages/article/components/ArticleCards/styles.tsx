import TextComp from 'components/textComp';
import styled from 'styled-components';
import { ContainerProps } from './types';

export const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 205px;
    height: 346px;
    margin-bottom: 20px;
    &:hover {
        color: ${({ theme }) => theme.palette.green[100].value};
    }
    &:disabled {
        cursor: auto;
    }
`;
export const Container = styled.div<ContainerProps>`
    width: ${({ width }) => width};
    border: 1px solid ${({ theme }) => theme.palette.gray[50].value};
    display: flex;
    border-radius: 8px;
    height: ${({ height }) => height};
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 1160px) {
        width: ${({ width }) => width};
        float: left;
        padding-top: 0;
        padding-bottom: 0;
    }
`;

export const AddCardText = styled(TextComp)<ContainerProps>`
    color: ${({ active, theme }) => (active ? theme.palette.green[100].value : '#515253')}; // TODO: use theme
    font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
    margin-top: 26px;
`;
export const CardWrapper = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    border: 1px solid transparent;
    transition: 0.2s;
    border-radius: 12px;
    margin-bottom: 20px;
    text-align: left;
    margin-right: 20px;
    &:hover {
        border: 1px solid ${({ theme }) => theme.palette.green[100].value};
    }
`;
export const CardContainer = styled.div`
  width: 500px;
  display: flex;
  flex-wrap: wrap;
`;
