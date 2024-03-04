import styled from 'styled-components';
import { TextComp } from 'components/textComp';

export const ImageContainer = styled.div`
    width: 300px;
    height: 500px;
    background-size: cover;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    &:after {
        content: "''";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, ${({ theme }) => theme.palette.gray['100'].value} 5%, #1212145c 50%, ${({ theme }) => theme.palette.gray['100'].value} 100%);
        border-radius: 12px;
    }
`;
export const ImageContainerHeader = styled(TextComp)`
    background-color: ${({ theme }) => theme.palette.gray['100'].value};
    padding: 15px;
    border-radius: 12px 12px 0 0;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const Mantra = styled(TextComp)`
    font-size: 20px;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: fit-content;
    margin: auto;
    padding: 15px;
    z-index: 1;
`;
