import EqualToIcon from 'components/Icons/EqualToIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import { InputContainer } from './style';
import Input from './input';
import { ItemProps } from './type';

const Item = ({ item, dragHandleProps }: ItemProps) => {
  const { onMouseDown, onTouchStart } = dragHandleProps;
  const {
    id, index, input, inputPlaceholder, onDelete, onInputChange, error,
  } = item;
  return (
    <InputContainer
      hidden={index === 0}
      data-cy={`multiInputContainer${input}${id}`}
      key={`multiInputContainer${input}${id}`}
    >
      <span className="disable-select dragHandle">
        <EqualToIcon onTouchStart={onTouchStart} onMouseDown={onMouseDown} />
      </span>
      <Input
        input={input}
        placeholder={inputPlaceholder}
        onChange={(val) => {
          onInputChange(val, id);
        }}
        error={index === 0 ? error : undefined}
      />
      <TrashIcon
        onClick={() => onDelete(id)}
        color={theme.palette.red[100].value}
        size={16}
      />
    </InputContainer>
  );
};

export default Item;
