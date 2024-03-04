import styled, { css } from 'styled-components';

const LoaderFullScreen = css`
    position: fixed;
    top: 0;
    left:0 ;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 99;
`;

export const LoaderWrapper = styled.div<{fullScreen: boolean}>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${({ fullScreen }) => fullScreen && LoaderFullScreen}
`;
