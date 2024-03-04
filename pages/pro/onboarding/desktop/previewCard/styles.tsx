import TextComp from 'components/textComp';
import Image from 'next/image';
import styled from 'styled-components';

export const ImageContainer = styled.div`
    width: 300px;
    height: 500px;
    background-size: cover;
    border-radius: 12px;
    position: relative;
    overflow: hidden;

    @media (max-width : 426px) {
        width: 100%;
        img {
            width: 100%;
        }   
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            180deg,
            ${({ theme }) => theme.palette.gray['100'].value} 10%,
            #1212145c 50%,
            ${({ theme }) => theme.palette.gray['100'].value} 100%
        );
        border-radius: 12px;
    }
`;

export const ImageContainerHeader = styled(TextComp)`
    padding: 15px;
    border-radius: 12px 12px 0 0;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`;

export const ImagePreview = styled(Image)`
    height: 100%;
    width: 100%;
    border-radius: 0 0 12px 12px;
    padding-top: 25px;
`;

export const Mantra = styled(TextComp)<{ isBio?: boolean }>`
    font-size: ${({ theme, isBio }) => isBio ? theme.typography['16 regular'].fontSize.value : theme.typography['20 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['20 regular'].fontWeight};
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: fit-content;
    margin: auto;
    padding: 15px;
    z-index: 1;
    white-space: pre-wrap;
    overflow-wrap: break-word;
`;

export const ProjectItem = styled.div`
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: fit-content;
    margin: auto;
    padding: 15px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    word-wrap: break-word;
`;

export const Field = styled(TextComp)`
    font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
`;

export const Duration = styled(TextComp)`
  ${Field};
  opacity: 0.3;
`;
