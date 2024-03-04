import { Container } from 'pages/pro/components/Blocks/styles';
import { TextComp } from 'components/textComp';
import styled from 'styled-components';
import { WordCounterWrapper } from 'components/Description/styles';
import {
  EditWrapper, ModalImageContainer, ProjectTitle,
} from './ViewProject/styles';

export const ImagesMeta = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 4px;
  padding-bottom: 10px;
`;
export const UploadedImageContainer = styled.div`
    width: 180px;
    height: 180px;
    overflow: hidden;
    border: 3px solid ${(props) => props.theme.palette.green['80'].value};
    position: relative;
`;
export const UploadedImage = styled.img`
    width: 100%;
`;
export const Title = styled(TextComp)`
  margin-bottom: 24px;
`;
export const Description = styled(TextComp)`
  margin-bottom: 10px;
  font-weight: 300;
`;
export const PageContainer = styled(Container)`
  min-width: 733px;
  width: 100%;
  padding: 32px;
  ${WordCounterWrapper} {
    margin-bottom: 24px;
  }
  border-radius: 12px;
  border: solid 1px ${({ theme }) => theme.palette.gray['40'].value};
  box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 768px) {
    padding: 24px;
    min-width: auto;
    max-width: calc(100% - 48px);
    border-radius: 0;
  }
`;
export const PageContainerWrapper = styled.div`
  position: absolute;
  top: 100px;
  padding-bottom: 100px;
  @media screen and (max-width: 768px) {
    padding-bottom: 0px;
    top: 0px;
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

export const ProjectModalContainer = styled(Container)`
  width: 974px;
  padding: 20px;
  color: ${(props) => props.theme.palette.white[100].value};
  height: calc(100vh - 200px);
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const MobileModalContainer = styled.span`
  display: flex;
  flex-direction: row;
  ${EditWrapper}{
    position: absolute;
    right: 32px;
  }
  ${ModalImageContainer}{
    margin-top: 2.5rem;
  }
  ${ProjectTitle} {
    padding-top: 2.5rem ;
  }
`;

export const ProjectModalContent = styled.span`
  flex: 1;
  min-width: 320px;
  gap: 32px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    min-width: 50%;
    margin-bottom: 16px;
  }
`;

export const OngoingProject = styled.div`
    position: relative;
    margin-bottom: 24px;
    margin-top: 24px;
`;
