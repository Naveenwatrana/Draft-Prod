import { Buttons, LinkButton, PrimaryButton } from 'components/buttonComp/style';
import styled from 'styled-components';

export const MediaUploadContainer = styled.div`
  height: 416px;
  margin: 16px;
  width: calc(100% - 32px);
  transform: translate(-50%, -50%);
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0;
  @media screen and (min-width: 992px) {
    transform: translate(-50%, -50%);
    position: fixed;
    width: 650px;
    height: 600px;
  }
`;

export const StyledButtons = styled(Buttons)`
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 16px;
  border-top: solid 1px #282629; // TODO: Add Color
  background-color: #121112; // TODO: Add Color
  button {
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    font-weight: 500;
  }
  ${LinkButton} {
    color: ${({ theme }) => theme.palette.red[100].value};
  }
  ${PrimaryButton} {
    background-color: #99E662; // TODO: Add Color
    color: #121112; // TODO: Add Color
    :disabled {
      background-color: rgba(153, 230, 98, 0.15) !important;
    }
  }
  @media screen and (max-width: 1023px) {
    ${LinkButton} {
      width: 50%;
    }
    bottom: 0px;
    padding: 16px;
    right: 0px;  
    left: 0;
    width: calc(100% - 32px);
  }
`;
