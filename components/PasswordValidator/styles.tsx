import styled from 'styled-components';
import TextComp from '../textComp';

export const Validation = styled.div<{ disable: boolean }>`
    display: flex;
    align-items: center;
    margin-top: 4px;
    opacity: ${({ disable }) => disable ? 0.4 : 1};

    & > svg {
        margin-right: 10px;
    }
`;

export const ValidationError = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['12 regular'].fontWeight};
`;
