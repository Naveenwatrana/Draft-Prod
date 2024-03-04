import styled from 'styled-components';
import { SkillTag as StyledSkillTag } from 'components/Atoms/SkillTag/styles';
import ButtonComp from 'components/buttonComp';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import { KebabMenuWrapper } from 'components/KebabMenu/styles';

type ImageContainerProps = {
  media: string;
  width?: number;
  height?: number;
  borderRadius?: number;
};

type EditProfileBioProps = {
  isEditProfileBioHover? : boolean;
}

export const Container = styled.div<EditProfileBioProps>`
  display: flex;
  align-self: flex;
  flex-direction: column;
  gap: ${({ isEditProfileBioHover }) => isEditProfileBioHover ? 0 : '24px'};
  max-width: 400px;
  @media screen and (max-width: 991px) {
    max-width: unset;
    width: calc(100vw - 32px);
    align-items: center;
    align-self: center;
    background-color: #1f1d20; // TODO: Add Color
    padding: 0 16px 32px;
    border-radius: 0 0 16px 16px;
    margin-top: 56px;
  }
`;

export const ProfileImage = styled.div<ImageContainerProps>`
  border-radius: 16px;
  height: ${({ height }) => height || 220}px;
  width: ${({ width }) => width || 220}px;
  border-radius: ${({ borderRadius }) => borderRadius || 16}px;
  object-fit: cover;
  background-image: url(${({ media }) => media});
  background-size: cover;
  @media screen and (max-width: 991px) {
    width: 123px;
    height: 123px;
  }
`;

export const InfoSectionWrapper = styled.div<EditProfileBioProps>`
  display: flex;

  ${({ isEditProfileBioHover }) => isEditProfileBioHover
&& `
:hover {
    min-height: 400px;
    min-width: 400px;
    ${InfoSection} {
      display: none;
    }
    ${Mantra} {
      display: none;
    }
    ${SkillSection} {
      display: none;
    }
    ${InfoSectionEditContainer} {
      display: flex;
      background-color: #625770; // TODO ADD COLOR
      border-radius: 0 0 16px 16px;
  }
  @media screen and (max-width: 991px) {
      width: 123px;
      height: 123px;
    }
`}

`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  align-self: stretch;
  @media screen and (max-width: 991px) {
    align-items: center;
  }
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: 24px;
  font-weight: 500;
`;

export const Subtitle = styled.div`
  width: fit-content;
  border: 1px solid #837694; // TODO ADD COLOR
  border-radius: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  padding: 8px;
  text-align: center;
`;

export const FollowContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FollowContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-self: flex-start;
  align-items: center;
  svg > circle {
    fill-opacity: 0.5;
  }
  @media screen and (max-width: 991px) {
    align-self: center;
  }
`;

export const Follow = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

export const Typography = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: 14px;
  width: 100%;
`;

export const Mantra = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 991px) {
    text-align: center;
  }
`;

export const FollowedText = styled.div`
  align-self: flex-start;
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: 14px;
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  ${KebabMenuWrapper} {
    flex: 1;
    button {
      width: 100%;
    }
  }
  ${IconWrapper} {
    flex: 1;
    padding: 0;
  }
`;

export const FollowBtn = styled(ButtonComp)`
  width: 50%;
  border-radius: 16px;
`;

export const MsgButton = styled(ButtonComp)`
  width: 50%;
  border-radius: 16px;
`;

export const SaveContentWrapper = styled(IconWrapper)`
  flex: 1;
  padding: 0;
`;

export const SkillSection = styled.div`
  display: flex;
  align-content: center;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  @media screen and (max-width: 991px) {
    justify-content: center;
  }
`;

export const SkillTag = styled(StyledSkillTag)`
  border-radius: 16px;
`;

export const InfoSectionEditContainer = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;
  min-width: 400px; 
`;

export const InfoEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 400px;
`;

export const UploadWrapper = styled.div`
  display: flex;
  width: 400px;
  align-items: center;
  justify-content: center;
`;

export const ImgPlaceholder = styled.div`
  width: 220px;
  height: 220px;  
  display: flex; 
  border-radius: 16px;
  border-radius: 16px;
  object-fit: cover;
  background-color: #625770; // TODO ADD COLOR
  background-size: cover;
  @media screen and (max-width: 991px) {
    width: 123px;
    height: 123px;
  }
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

export const AddText = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-align: center;
  font-size: 16px;
`;

export const UploadBtn = styled.div`
  display: flex;
  height: 44px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.palette.green[80].value};
  cursor: pointer;
`;

export const EditBioBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const EditBioButton = styled(ButtonComp)`
  width: 20%;
  border-radius: 14px;
  height: 46px;
  font-size: 14px;
  padding: 10px;
`;

export const SubTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 22px;
`;

export const LocationIconWrapper = styled.div`
  align-self: center;
`;

export const ActionSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SkillSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const PencilIconWrapper = styled.div`
  align-self: auto;
`;
