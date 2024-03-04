import lang from 'common/lang';
import KebabMenu from 'components/KebabMenu';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import EllipsisIcon from 'components/Icons/EllipsisIcon';
import PencilIcon from 'components/Icons/PencilIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import { PublisherMenuProps } from './types';
import { PublisherMenuItem } from './style';

const { deleteLabel, editLabel } = lang.profile;
const PublisherMenu = ({ onDelete, onEdit }: PublisherMenuProps) => {
  return (
    <KebabMenu
      position="top"
      icon={(
        <IconWrapper>
          <EllipsisIcon />
        </IconWrapper>
      )}
      list={(
        <>
          <PublisherMenuItem onClick={onEdit} data-cy="editArticle">
            <PencilIcon color={theme.palette.white[100].value} />
            <div>{editLabel}</div>
          </PublisherMenuItem>
          <PublisherMenuItem onClick={onDelete} data-cy="deleteArticle">
            <TrashIcon variant="small" />
            <div>{deleteLabel}</div>
          </PublisherMenuItem>
        </>
      )}
    />

  );
};

export default PublisherMenu;
