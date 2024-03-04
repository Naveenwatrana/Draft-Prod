import { StyledDescription } from 'components/Atoms/InfoBlock/style';
import styled from 'styled-components';
import { Divider } from 'components/DiscardModal/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 634px;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.defaultFont};
  position: relative;
  height: max-content;
  padding: 60px;
  @media screen and (max-width: 1023px) {
    width: auto;
    padding: 24px 4px 88px;
    height: calc(100vh - 258px);
    overflow-y: auto;
    margin-top: 16px;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;

export const Heading = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  line-height: 36px;
`;

export const SubHeading = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: 400;
  line-height: 26px;
`;

export const Card = styled.div`
  display: flex;
  > svg:first-child {
    position: absolute;
    left: 0;
    top: 0;
  }
  padding: 32px 24px;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 16px;
  flex: 1 0 0;
  flex-wrap: wrap;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[60].value};
  position: relative;
  min-height: 240px;
  overflow: hidden;
  @media screen and (max-width: 1023px) {
    justify-content: flex-start;
    flex-wrap: nowrap;
    min-height: 500px;
    flex-direction: column;
  }
`;

export const CardSection = styled.div`
  display: flex;
  min-width: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
`;

export const CardHeading = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 semibold'].fontWeight};
  line-height: 26px;
`;

export const CardTypographyOne = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: 400;
  line-height: 26px;
`;

export const CardTypographyTwo = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: 400;
  line-height: 26px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  z-index: 1;
  cursor: pointer;
  width: auto !important;
`;

export const ButtonTypography = styled.div`
  color: ${({ theme }) => theme.palette.green[80].value};
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
`;

export const SkillContainer = styled.form`
  display: flex;
  padding: 32px;
  align-items: flex-start;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  background: ${({ theme }) => theme.palette.gray[80].value};
  box-shadow: 0px 24px 40px 0px rgba(0, 0, 0, 0.25); // TODO: Add color

  ${StyledDescription} {
    width: calc(100% - 32px);
  }
`;

export const ModalHeading = styled.div`
  display: flex;
  width: 670px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex-shrink: 0;
  align-self: stretch;
  > * {
    width: 100%;
  }
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  line-height: 36px;
`;

export const ModalContent = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: 400;
  line-height: 26px;
`;

export const BasicSalaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const BasicSalary = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
`;

export const BasicSalaryContent = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: 400;
  line-height: 26px;
`;

export const TargetEarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const TargetEarningHeading = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
`;

export const TargetEarningContent = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 400;
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  line-height: 26px;
`;

export const LanguageRequirementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const LanguageContainerHeading = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
`;

export const LangContent = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: 400;
  line-height: 26px;
`;

export const AddMoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

export const AddMoreHeading = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
`;

export const AddMoreContent = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.typography['16 semibold'].fontSize.value}px;
  font-weight: 400;
  line-height: 26px;
`;

export const SkillPopupHeading = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['24 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['24 semibold'].fontWeight};
  line-height: 36px;
`;

export const SkillPopupSubHeading = styled.div`
  color: ${({ theme }) => theme.palette.white[100].value};
  font-size: ${({ theme }) => theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['12 semibold'].fontWeight};
  line-height: 18px;
`;

export const SkillPopupContent = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.palette.gray[10].value};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); // TODO: Add Color
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
  line-height: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  gap: 24px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const DaysContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const CancelableTagsContainer = styled(TagsContainer)`
  margin-top: 0px;
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

export const SliderPlaceHolderContainer = styled.div`
  width: 95% !important;
  padding: 24px 16px 16px 16px;
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const SkillsDivider = styled(Divider)`
  margin-bottom: 0px;
`;

export const SliderMarkerData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 425px) {
    gap: 28%;
  }
  @media (max-width: 375px) {
    gap: 24%;
  }
  @media (max-width: 375px) {
    gap: 20%;
  }
`;

export const SliderMarkerDataOption = styled.div`
  text-align: center;
  font-size: 10px;
  color: #F7F7F7;
  width: 77px;
  padding: 5px;
  line-hight: 14px;
  font-weight: ${(props) => props.theme.typography['10 semi'].fontWeight};
`;

export const SliderMarker = styled.div`
  height: 4px;
  width: 4px,
  margin-top: 0px,
  border-radius: '3px',
  background-volor: '#5ff088',
`;

export const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  gap:8px;
  flex-direction: column;
`;

export const Skill = styled.div`
  width: 100%;
  display: flex;
  gap:8px;
`;

export const SkillSliderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 95%;
  font-size: 14px;
  line-height: 20px;
  border-radius: 8px;
  background: #1E1C1F;
  padding: 20px 16px 20px 16px;
`;

export const SkillName = styled.div`
  width: 30%;
`;

export const SkillSlider = styled.div`
  width: 70%;
`;

export const RemoveSkill = styled.div`
  width: 5%;
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
`;

export const SkillDescriptionInfo = styled(StyledDescription)`
  width: 95% !important;
`;
