import styled from 'styled-components';
type ModalProps = {
  open: boolean;
};
type ButtonContainerProps = {
  hasNotification: boolean;
};

export const Modal = styled.div<ModalProps>`
  width: 100%;
  left: 0;
  height: calc(100vh - 67px);
  position: fixed;
  top: 67px;
  background-color: ${({ theme }) => theme.palette.gray[100].value}bf;
  z-index: ${({ open }) => (open ? 6 : -1)};

  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: z-index 500ms, opacity 500ms, visibility 500ms ease-in-out;

  ${({ open }) => open
    && `   
      > div:first-child {
        opacity: 1;
        top: 67px;
        z-index: 2;
        right: 0;
        @media screen and (max-width: 768px) {
          top: 174px;
        } 
      }
    `}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 410px;
  height: calc(100vh - 67px);
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  z-index: 0;

  right: -100%;
  top: 67;
  opacity: 0;
  transition: right 500ms, top 500ms, opacity 500ms ease-in-out;

  @media screen and (max-width: 768px) {
    width: calc(100% - 4rem);
    top: 174px;
    height: calc(100vh - 250px);
    right: 0;
    top: 100vh;
  }
`;

export const ButtonContainer = styled.div<ButtonContainerProps>`
  button {
    display: flex;
    align-items: center;
  }
  ${({ hasNotification }) => !hasNotification && ` 
    button:hover {
      svg > g > path:nth-child(2) {
        display: block;
      }
    }
    svg > g > path:nth-child(2) {
      display: none;
    }
  }
  `}
`;
