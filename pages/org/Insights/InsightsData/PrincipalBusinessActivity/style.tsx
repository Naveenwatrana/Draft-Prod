import TextComp from 'components/textComp';
import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
}
`;
export const PrincipalTitle = styled(TextComp)`
  width: 150px;
  @media screen and (max-width: 767px) {
    text-align: center;
    margin-bottom: 8px;
}
`;
export const TileContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export type TileProps = {
  width: string;
  backgroundColor: string;
}
export const Tile = styled.div<TileProps>`
    border: solid 1px rgba(84, 171, 172, 0.50); // TODO: Add Color
    cursor: pointer;
    padding: 8px 10px;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    line-height: ${({ theme }) => theme.typography['14 semibold'].lineHeights.value}px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    width: ${({ width }) => width};
    color: ${({ theme }) => theme.palette.white[100].value};
    text-align: center;
    @media screen and (max-width: 767px) {
      width: ${({ width }) => `calc(${width} + 20%)`};
  }
`;
