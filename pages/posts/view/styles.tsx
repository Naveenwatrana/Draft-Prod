import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 90vh;
    overflow: hidden;
    display: flex;
    @media screen and (max-width: 1023px) {
        overflow-y: auto;
        flex-direction: column;
        padding-top: 16px !important
    }
`;
