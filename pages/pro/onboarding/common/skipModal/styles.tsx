import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export const Card = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const CardContainer = styled.div`
    width: 320px;
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 15px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    text-align: center;

    @media (min-width: 768px) {
        width: 425px;
        padding: 32px;
        gap: 24px;
    }
`;

export const Subtitle = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
`;

export const BtnWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;

    @media (min-width: 768px) {
        display: flex;
        flex-direction: row-reverse;
        margin-top: auto;
        width: 100%;
    }
`;

export const SkipButton = styled(ButtonComp)`
    background: none;
    box-shadow: none;
    color: ${({ theme }) => theme.palette.green['100'].value};
`;
