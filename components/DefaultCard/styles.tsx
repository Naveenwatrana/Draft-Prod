import styled from 'styled-components';

export const Card = styled.div<{
  cover?: string;
  split?: boolean;
  width?: string;
  height?: string;
  primaryFontSize?: string;
  hideBorder?: boolean;
}>`
  width: ${({ width }) => (width ? width : '350px')};
  height: ${({ height }) => (height ? height : '550px')};
  border: ${({ hideBorder }) => (hideBorder ? 'none' : '1px solid rgba(56,57,58,1)')}; //TODO: Get color from theme
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${({ cover }) => cover ? `url(${cover})` : '#000000'}; //TODO: Get color from theme
  background-size: ${({ split }) => (split ? '100% 50%' : 'cover')};
  background-repeat: no-repeat;
  background-color: #000000; //TODO: Get color from theme
  font-size: ${({ primaryFontSize }) => primaryFontSize ? primaryFontSize : '14px'};

  @media (min-width: 768px) {
    width: ${({ width }) => (width ? width : '300px')};
    height: ${({ height }) => (height ? height : '500px')};
  }
  @media (max-width: 424px) {
    width: 80vw;
    height: ${({ height }) => (height ? height : '500px')};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${({ split }) => !split && 'background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(18, 18, 20, 0.51) 60%, #000000 91.15%)'}; //TODO: Get color from theme
    border-radius: 12px;
    z-index: 1;
  }
`;
export const MuteIcnWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  right: 15px;
  bottom: 15px;
`;
