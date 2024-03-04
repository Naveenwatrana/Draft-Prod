import ButtonComp from 'components/buttonComp';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export const BackButton = styled(ButtonComp)`
  margin-left: 0;
  margin-right: auto;
`;

export const PageContainerWrapper = styled.div`
  position: absolute;
  top: 100px;
  padding-bottom: 100px;
  @media screen and (max-width: 768px) {
    padding-bottom: 0px;
    top: 0px;
    width: 100%;
  }
`;

export const Label = styled(TextComp)`
  line-height: 18px;
  margin-bottom: 4px;
`;

export const DescriptionLabel = styled(Label)`
  margin-top: 24px;
`;

export const AddMediaLabelContainer = styled.div`
  display: flex;
  margin-top: 28px;
  justify-content: space-between;
  ${Label}:last-child {
    font-weight: 300;
  }
`;
export const OngoingProject = styled.div`
  position: relative;
`;

export const ModalSubTitle = styled.div`
  color: ${({ theme }) => theme.palette.gray[10].value};
  font-size: ${({ theme }) => theme.typography['16 regular'].fontSize.value}px;
  font-weight: ${({ theme }) => theme.typography['16 regular'].fontWeight};
  line-height: ${({ theme }) => theme.typography['16 regular'].lineHeights.value}px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CancelableTagsContainer = styled(TagsContainer)`
  margin-top: 0px;
`;

export const InputTitle = styled(TextComp)`
  font-weight: 600;
`;

export const SkillsInputArea = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const AddSkillsButton = styled(ButtonComp)`
  align-self: flex-start;
  margin-top: 2px;
  margin-bottom: 7px;
  font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
`;

export const TagCounterWrapper = styled.div`
    display: flex;
    justify-content: end;
    margin-top: -12px;
`;
