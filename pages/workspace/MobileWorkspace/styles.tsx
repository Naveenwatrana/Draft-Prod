import styled from 'styled-components';

export const Container = styled.div`
    background-color: ${(props) => props.theme.palette.gray[80].value};
    height: calc(100% - 32px);
    padding: 16px 16px;
`;
