import TextComp from 'components/textComp';
import styled from 'styled-components';
import { Container as ContainerComp } from '../../AddNewCardWorkArea/styles';

export const Container = styled(ContainerComp)`
    flex-direction: column;
    width: calc(100% - 32px);
`;
export const PageTitle = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
    margin-top: 20px;
`;
export const CardTypeOption = styled.div`
    background: ${({ theme }) => theme.palette.gray[50].value};
    height: 254px;
    width: 187px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 1160px) {
        height: 38vh;
        max-height: 254px;
    }
`;
export const Title = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
    margin-top: 25px;
`;
export const Description = styled(TextComp)`
    text-align:center;
    color: ${({ theme }) => theme.palette.gray[10].value};
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
    margin-top: 16px;

`;
export const CancelButton = styled.button`
    background: none;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
`;
