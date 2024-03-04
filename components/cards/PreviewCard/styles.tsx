import DefaultProfile from 'components/Icons/DefaultProfile';
import styled from 'styled-components';
import { ImageContainerProps, StyledCardProps } from './types';

export const ImageContainer = styled.div<ImageContainerProps>`
    width: 300px;
    background-size: cover;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    height: ${({ height }) => height ? `${height}px` : 'auto'};

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
        height: 500px;
        background: linear-gradient(
            180deg,
            ${({ theme }) => theme.palette.gray['100'].value} 10%,
            #1212145c 50%,
            ${({ theme }) => theme.palette.gray['100'].value} 100%
        );
        border-radius: 12px;
    }
`;

export const ProfileDefaultImage = styled(DefaultProfile)`
    position: absolute;
    top: 0;
`;

export const StyledCard = styled.div<StyledCardProps>`
  height: ${({ height }) => height || 520}px;
  width: ${({ width }) => width || 291}px;
  @media screen and (min-height: 855px) {
    height: ${({ height }) => height || 650}px;
    width: ${({ width }) => width || 364}px;
  }
  @media screen and (min-height: 1055px) {
    height: ${({ height }) => height || 780}px;
    width: ${({ width }) => width || 440}px;
  }
  border-radius: ${({ borderRadius }) => borderRadius || 16}px;
  object-fit: cover;
  background-image: url(${({ image }) => image});
  background-size: cover;
  position: relative;
  video {
    border-radius: ${({ borderRadius }) => borderRadius || 16}px;
    height: ${({ height }) => height || 520}px;
    width: ${({ width }) => width || 291}px;
    @media screen and (min-height: 855px) {
      height: ${({ height }) => height || 650}px;
      width: ${({ width }) => width || 364}px;
    }
    @media screen and (min-height: 1055px) {
      height: ${({ height }) => height || 780}px;
      width: ${({ width }) => width || 440}px;
    }
  }
`;
