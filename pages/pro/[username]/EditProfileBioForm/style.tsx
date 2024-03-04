import { ImageWithStyle } from 'components/Atoms/ViewUploadImage/styles';
import { CropControls, ImageCropperContainer } from 'components/CardCreationWizard/components/CardWorkArea/styles';
import styled from 'styled-components';

export const EditBioContainer = styled.div`
    display: flex;
    padding: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
`;

export const BioHeading = styled.div`
    color: ${({ theme }) => theme.palette.white[100].value};
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
    font-weight: 500;
`;

export const AddImageContainer = styled.div`
    display: flex;
    width: 100px;
    height: 280px;
    padding: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
    background: ${({ theme }) => theme.palette.gray[50].value};
`;

export const ImageContainer = styled.div`
    width: 250px;
    ${ImageWithStyle} {
        width: 256px;
        height: 256px;
    }
`;

export const ImgRestrictionText = styled.div`
    color: var(--text-subtext, #A69DAB);
    font-size: ${({ theme }) => theme.typography['12 regular'].fontSize.value}px;
`;

export const AddImageText = styled.div`
    color: ${({ theme }) => theme.palette.white[100].value};
`;

export const PersonalInfoContainer = styled.div`
    display: flex;
    padding: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`;

export const MantraContainer = styled.div`
    display: flex;  
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`;

export const CounterWrapper = styled.div`
  align-self  : end ;
`;

// PROFILE IMAGE CROP MODAL

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const ModalHeading = styled.div`
margin-left: 24px;
    font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
    font-weight: 500;
`;

export const ImgCropContainer = styled.div`
    align-self: center;
    ${CropControls} {
        position: unset;
        width: 345px;
    }
    ${ImageCropperContainer} {
        height: 515px;
        width: 515px;
    }
    .reactEasyCrop_Cover_Vertical {
        width: 100%;
    }
    .reactEasyCrop_Image {
        border-radius: 16px;
    }
    .eactEasyCrop_Container {
        border-radius: 16px;
    }
    ${CropControls} {
        margin-top: 32px;
    }
`;
