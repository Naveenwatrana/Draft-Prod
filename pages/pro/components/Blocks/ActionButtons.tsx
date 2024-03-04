import { theme } from 'common/theme';
import PencilIcon from 'components/Icons/PencilIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import { IconContainer, IconsContainer } from 'pages/pro/styles';

export type ActionButtonsProps = {
    handleEdit: () => void;
    handleDelete: () => void;
    dataCy?: string;
};

const ActionButtons = ({ handleEdit, handleDelete, dataCy }: ActionButtonsProps) => (
  <IconsContainer>
    <IconContainer contained onClick={handleEdit} data-cy={`edit-${dataCy}`}>
      <PencilIcon size={16} />
    </IconContainer>
    <IconContainer onClick={handleDelete}>
      <TrashIcon color={theme.palette.red[100].value} size={16} data-cy={`delete-${dataCy}`} />
    </IconContainer>
  </IconsContainer>
);

export default ActionButtons;
