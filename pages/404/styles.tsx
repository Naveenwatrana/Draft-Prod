import styled from 'styled-components';
import TextComp from 'components/textComp';

export const NotFoundContainer = styled.div`
    background: ${({ theme }) => theme.palette.gray['80'].value};
    padding: 0 20px;
    height: 100vh;
`;

export const NotFoundHeader = styled.div`
    padding: 24px;
    border-bottom: 1px solid #373742;
`;

export const NotFoundSection = styled.div`
    background: ${({ theme }) => theme.palette.gray['80'].value};
    height: 90vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    & > svg {
        margin-bottom: 32px;
    }
`;

export const NotFoundTitle = styled(TextComp)`
    margin-bottom: 8px;
`;

export const NotFoundDescription = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    margin-bottom: 32px;
`;
