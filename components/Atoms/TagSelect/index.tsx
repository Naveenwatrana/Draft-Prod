import CancelIcon from 'components/Icons/CrossIcon';
import { theme } from 'common/theme';
import CheckIcon from 'components/Icons/CheckIcon';
import PlusIcon from 'components/Icons/PlusIcon';
import { StyledTag } from './style';
import { TagSelectProps } from './type';

const TagSelect = ({
  label,
  toggleSelect,
  isSelected,
  cancelSelect,
  withCrossIcon,
  withCheckIcon,
  icon,
  cancelable,
}: TagSelectProps) => {
  return (
    <StyledTag onClick={toggleSelect} isSelected={isSelected} cancelable={withCrossIcon || (withCheckIcon && isSelected) || (cancelable && isSelected)}>
      <div>{label}</div>
      {isSelected && withCrossIcon && cancelSelect && (
        <CancelIcon
          color={theme.palette.white[100].value}
          size={16}
          variant="small"
          onClick={(e) => {
            e?.stopPropagation();
            cancelSelect();
          }}
          data-testid="cancelSelect"
        />
      )}
      {isSelected && withCheckIcon && toggleSelect && (
        <CheckIcon
          variant="small"
          data-testid="checkSelect"
        />
      )}
      {!isSelected && withCheckIcon && toggleSelect && (
        <PlusIcon
          color={theme.palette.white[100].value}
          size={12}
          variant="small"
          data-testid="plusSelect"
        />
      )}
      {icon}
    </StyledTag>
  );
};

export default TagSelect;
