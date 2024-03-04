import styled from 'styled-components';

export type ContainerProps = {
    width?: string;
    cardsCount: number;
    listView?: boolean;
};
export const Container = styled.div<ContainerProps>`
    padding: 16px;
    height: calc(100% - 32px);
    background: ${({ theme, listView }) => listView ? 'none' : theme.palette.gray[80].value};
    overflow-y: auto;
    display: ${({ listView }) => listView ? 'flex' : 'block'};
    flex-direction: row;
    min-width: 136px;
    @media (max-width: 1160px) {
        width: ${({ cardsCount }) => (cardsCount * 340)}px;
        height: 100%;
        display: flex;
        overflow: hidden;
    }
`;
