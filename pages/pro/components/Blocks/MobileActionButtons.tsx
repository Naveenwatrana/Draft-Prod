import { MouseEvent } from 'react';
import { theme } from 'common/theme';
import PencilIcon from 'components/Icons/PencilIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import { IconContainer, MobileIconsContainer } from 'pages/pro/styles';

export type MobileActionButtonsProps = {
    handleEdit?: (e: MouseEvent<HTMLDivElement>) => void;
    handleDelete?: (e: MouseEvent<HTMLDivElement>) => void;
};

const MobileActionButtons = ({
  handleEdit, handleDelete,
}: MobileActionButtonsProps) => (
  <MobileIconsContainer>
    {handleEdit && (
      <IconContainer contained data-cy="handleEdit" onClick={handleEdit}>
        <PencilIcon size={16} />
      </IconContainer>
    )}
    {handleDelete && (
      <IconContainer data-cy="handleDelete" onClick={handleDelete}>
        <TrashIcon color={theme.palette.red[100].value} size={16} />
      </IconContainer>
    )}
  </MobileIconsContainer>
);

export default MobileActionButtons;
