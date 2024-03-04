import { ModalContentForm } from 'components/Modal/style';
import { Buttons, LinkButton, PrimaryButton } from 'components/buttonComp/style';
import { DeleteIcon, ImageWithStyle } from 'components/Atoms/ViewUploadImage/styles';
import styled from 'styled-components';
import Link from 'next/link';

export const ModalHeader = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  line-height: 32px;
`;

export const StyledButtons = styled(Buttons)`
  button {
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    font-weight: 500;
  }
  ${LinkButton} {
    color: #99E662; // TODO: Add Color
  }
  ${PrimaryButton} {
    background-color: #99E662; // TODO: Add Color
    color: #121112; // TODO: Add Color
    :disabled {
      background-color: rgba(153, 230, 98, 0.15) !important;
    }
  }
`;

export const MyLinkCOntainer = styled.div`
    display: flex;  
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`;

export const CounterWrapper = styled.div`
  align-self  : end ;
`;

export const ModalSubTitle = styled.div`
  color: ${({ theme }) => theme.palette.white[50].value};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: 500;
  line-height: 32px;
`;

// EDIT LINK MODAL

export const EditModalContentWrapper = styled.div`
    ${ModalContentForm} {
        width: 860px;
    }
`;

export const BlockWrapper = styled.div`
    display: flex;
    gap: 32px;
`;

export const LinkBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 24px;
  align-items: center;
  background-color: #1F1D20; // TODO ADD COLOR
  border: 1px solid ${({ theme }) => theme.palette.gray[50].value};
  border-radius: 16px;
  gap: 24px;
`;

export const GitHubLinkBlockWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 370px;
  padding: 24px;
  align-items: center;
  background-color: #1F1D20; // TODO ADD COLOR
  border: 1px solid ${({ theme }) => theme.palette.gray[50].value};
  border-radius: 16px;
  gap: 24px;
`;

export const EditLinkBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  gap: 32px;
`;

export const LinkImageContainer = styled.div`
  width: 363px;
  ${ImageWithStyle} {
      width: 363px;
      height: 243px;
      object-fit: cover;
    }
`;

export const EditLinkContainer = styled.div`
  display: flex;  
  width: 410px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const EditLinkImageContainer = styled.img`
  border-radius: 16px;
  border: 1px solid #39363b;
  object-fit: cover;
  width: 100%;
  height: 243px;
`;

export const LinkInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: flex-start;
  max-width: 345px;
  min-height: 150px;
`;

export const LinkTitle = styled.div`
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: 500;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: pre-wrap;
`;

export const LinkDescription = styled.div`
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.gray[10].value};
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: pre-wrap;
`;

export const MoreBtnContainer = styled.div`
  width: 100%;
  cursor: pointer;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.gray[40].value};
  font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
  height: 45px;
  display: flex;
  justify-content: center;
  border-radius: 18px;
  overflow: hidden;
`;

export const LinkImage = styled.div`
  position: relative;
  object-fit: cover;
  background-repeat: no-repeat;
    ${DeleteIcon} {
      border-radius: 24px;
      background-color: ${({ theme }) => theme.palette.red[90].value};
      :hover {
        background-color: ${({ theme }) => theme.palette.gray[60].value};
      }
    }
`;
