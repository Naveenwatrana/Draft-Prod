import ButtonComp from 'components/buttonComp';
import PlusIcon from 'components/Icons/PlusIcon';
import { EmptyResumeContentProps } from './type';
import {
  AddSection, AddSectionDescription, ContentWrapper, AddSectionTitle, BtnWrapper, IconWrapper,
} from './style';

const EmptyContentCard = ({
  onClick,
  description,
  buttonLabel,
  show,
  title,
  image,
}: EmptyResumeContentProps) => {
  if (!show) return null;
  return (
    <AddSection>
      {image}
      <ContentWrapper>
        <AddSectionTitle>{title}</AddSectionTitle>
        <AddSectionDescription>{description}</AddSectionDescription>
        <BtnWrapper onClick={onClick}>
          <IconWrapper>
            <PlusIcon size={16} variant="small" />
          </IconWrapper>
          <ButtonComp label={buttonLabel} variant="link" />
        </BtnWrapper>
      </ContentWrapper>
    </AddSection>
  );
};

export default EmptyContentCard;
