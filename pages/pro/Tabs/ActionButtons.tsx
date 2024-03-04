import { theme } from 'common/theme';
import TrashIcon from 'components/Icons/TrashIcon';
import lang from 'common/lang';
import PencilIcon from 'components/Icons/PencilIcon';
import TextComp from 'components/textComp';
import { ActionDeleteIconContainer, ActionIconContainer, ActionIconsContainer } from '../styles';

export type ActionButtonsProps = {
    handleDelete?: () => void;
    handleEdit?: () => void;
    dataCy?: string;
};

const {
  profile: { deleteLabel, editLabel },
} = lang;

const ActionButtons = ({ handleDelete, handleEdit, dataCy }: ActionButtonsProps) => (
  <ActionIconsContainer>
    {handleEdit && (
      <ActionIconContainer onClick={handleEdit} data-cy={`handleEdit${dataCy}`}>
        <PencilIcon size={16} />
        <TextComp component="h6">{editLabel}</TextComp>
      </ActionIconContainer>
    )}
    {handleDelete && (
      <ActionDeleteIconContainer onClick={handleDelete} data-cy={`handleDelete${dataCy}`}>
        <TrashIcon color={theme.palette.red[100].value} size={16} />
        <TextComp component="h6">{deleteLabel}</TextComp>
      </ActionDeleteIconContainer>
    )}
  </ActionIconsContainer>
);

export default ActionButtons;
