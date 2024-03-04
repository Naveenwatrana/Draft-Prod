import TextComp from 'components/textComp';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 16px;
    height: calc(100% - 32px);
    width: calc(100% - 196px);
    background: ${({ theme }) => theme.palette.gray[60].value};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
`;
export const Title = styled(TextComp)`
    font-weight: ${({ theme }) => theme.typography['20 semibold'].fontWeight};
    font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
    margin-top: 25px;
`;
export const CardTypeOption = styled.div`
    background: ${({ theme }) => theme.palette.gray[80].value};
    height: 254px;
    width: 187px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    &:hover {
        border-color: ${({ theme }) => theme.palette.green[100].value};
        ${Title} {
            color: ${({ theme }) => theme.palette.green[100].value};
        }
        path {
            stroke: ${({ theme }) => theme.palette.green[100].value};
        }
    }
`;
export const Description = styled(TextComp)`
    text-align:center;
    color: ${({ theme }) => theme.palette.gray[10].value};
    font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
    font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
    margin-top: 16px;

`;
