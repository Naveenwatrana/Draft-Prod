import PlusIcon from 'components/Icons/PlusIcon';
import { theme } from 'common/theme';
import lang from 'common/lang';
import { Button, Text } from './styles';
import { CreateButtonProps } from './types';

const { create } = lang.createContent;

const CreateButton = ({ onClick, active }: CreateButtonProps) => {
  return (
    <Button
      isActive={active}
      onClick={onClick}
      label={(
        <>
          <Text>{create}</Text>
          <PlusIcon size={16} color={theme.palette.green[80].value} />
        </>
      )}
    >
    </Button>
  );
};

export default CreateButton;
