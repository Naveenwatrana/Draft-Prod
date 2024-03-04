import ButtonComp from 'components/buttonComp';
import { AddSection, AddSectionDescription } from './style';
import { EmptyResumeContentProps } from './type';

const EmptyResumeContent = ({
  onClick,
  description,
  buttonLabel,
  show,
}: EmptyResumeContentProps) => {
  if (!show) return null;
  return (
    <AddSection>
      <AddSectionDescription>{description}</AddSectionDescription>
      <ButtonComp onClick={onClick} label={buttonLabel} variant="link" />
    </AddSection>
  );
};

export default EmptyResumeContent;
