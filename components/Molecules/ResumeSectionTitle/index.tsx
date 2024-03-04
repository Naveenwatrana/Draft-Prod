import PlusIcon from 'components/Icons/PlusIcon';
import TextComp from 'components/textComp';
import { TitleContainer, StatusTag, StatusInner } from './styles';

export type ResumeSectionTitleProps = {
  title: string;
  onClick: () => void;
  isAddEnable?: boolean;
  statusTag?: string;
}

const ResumeSectionTitle = ({
  title, onClick, isAddEnable, statusTag,
}: ResumeSectionTitleProps) => {
  return (
    <TitleContainer>
      <TextComp component="h2">
        {title}
        {statusTag && (
          <StatusTag>
            <StatusInner>{statusTag}</StatusInner>
          </StatusTag>
        )}
      </TextComp>
      {isAddEnable && <PlusIcon onClick={onClick} data-cy={`add-${title}`} />}
    </TitleContainer>
  );
};

export default ResumeSectionTitle;
