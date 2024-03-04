import styled from 'styled-components';
import bgImage from 'public/images/createOrganizationContent.png';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CreateOrganizationBody = styled.div`
  margin: 4rem 0;
  min-height: calc(100vh - 129px);
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['50'].value};
  display: flex;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`;

export const PlaceholderImage = styled.div`
  background-image: url(${bgImage.src});
  background-size: cover;
  width: 495px;
  height: 414px;
`;

export const Buttons = styled.div`
  display: flex;
  position: fixed;
  bottom: -4px;
  right: 0;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  @media screen and (max-width: 768px) {
    background-color: ${({ theme }) => theme.palette.gray['80'].value};
    width: calc(100% - 32px);
    right: 0;
    button {
      width: 50%;
    }
    gap: 24px;
  }
  border-top: solid 1px ${({ theme }) => theme.palette.gray[40].value};
  flex-direction: column-reverse;
  padding: 16px;
  margin-top: 10px;
  gap: 16px;
  flex-direction: row;
  justify-content: end;
  button:last-child {
    padding: 12px 16px;
    width: 169px;
    :disabled {
      background: rgba(104, 225, 116, 0.15); // TODO: Add color
      color: ${({ theme }) => theme.palette.gray[80].value};
    }
  }
  button:first-child {
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
`;
