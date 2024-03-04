import styled from 'styled-components';

export const Container = styled.div`
    width: calc(100% - 164px);
    height: 100%;
    background: ${({ theme }) => theme.palette.gray[60].value};
    display: flex;
`;
export const CropContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    background: transparent;
`;
export const CropperContainer = styled.div`
    width: 386px;
    height: 485px;
    margin: auto;
`;
export const CropControls = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    width: 70%;
    margin: 0 auto;
`;
export const SliderContainer = styled.div`
    background-color: ${({ theme }) => theme.palette.gray[40].value};
    display: flex;
    width: 100%;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
    height: 60px;
    border-radius: 10px;
    position: relative;
    z-index: 10;
`;
export const MainContainer = styled.div`
    width: calc(100% - 376px);
    padding: 0 16px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.palette.gray[80].value};
    border-left: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    border-right: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;
export const LoadingContainer = styled.div`
  position: absolute;
  z-index: 9;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
`;

export const ImageCropperMainContainer = styled(MainContainer)`
  background-color: #121112; // TODO: Add color
  border: none;
  width: 100%;
`;

export const ImageCropperContainer = styled(CropperContainer)`
  height: 520px;
  width: 450px;
  position: relative;
  @media screen and (min-width: 1800px) {
    height: 650px;
    width: 550px;
  }
  @media screen and (min-height: 1023px) {
    height: 780px;
    width: 630px;
  }
  ${CropControls} {
    bottom: 22px;
    left: calc(50% - 100px);
    width: 200px;
    position: absolute;
    ${SliderContainer} {
      border: 1px solid #39363b; // TODO: Add color
      background: #282629; // TODO: Add Color
      height: auto;
      box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.4);
    }
  }
`;
