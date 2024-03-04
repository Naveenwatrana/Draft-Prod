import TextComp from 'components/textComp';
import ButtonComp from 'components/buttonComp';
import styled from 'styled-components';
import { Container as ContainerComp } from '../../AddNewCardWorkArea/styles';

export const PageTitle = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
    margin-top: 20px;
    margin-bottom: 8px;
`;

export const Container = styled(ContainerComp)`
    flex-direction: column;
    width: calc(100% - 32px);
    justify-content: flex-start;
    padding-bottom: 0;
    gap: 0;
    height: calc(100% - 16px);
    @media (max-width: 1160px) {
        height: auto;
        min-height: calc(100% - 16px);
    }
`;

export const CancelButton = styled.button`
    background: none;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
`;
export const Description = styled(TextComp)`
    text-align:center;
    font-weight: ${({ theme }) => theme.typography['20 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['20 regular'].fontSize.value}px;
    color: ${({ theme }) => theme.palette.gray[10].value};
    margin-bottom: 26px;
`;

export const ActionButtonContainer = styled.div`
    padding: 16px;
    border-top: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 52px;
    position: fixed;
    z-index: 9;
    bottom: 0;
    width: calc(100% - 32px);
    background-color: ${({ theme }) => theme.palette.gray[60].value};
`;
export const SaveButton = styled(ButtonComp)`
    padding: 12px 52px;
`;
