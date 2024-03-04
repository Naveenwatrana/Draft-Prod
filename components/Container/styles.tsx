import styled from 'styled-components';
import ButtonComp from '../buttonComp';
import TextComp from '../textComp';

export const Box = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

export const Title = styled(TextComp)`
    margin-bottom: 16px;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0;
    border: 1px solid ${(props) => props.theme.palette.gray[60].value};
    border-radius: 12px;
`;

export const Description = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    margin: 16px 0 0;
`;

export const CTA = styled(ButtonComp)`
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    margin: 16px 0 0;
`;
