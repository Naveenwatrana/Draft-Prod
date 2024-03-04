import { MyOptionType } from 'components/Select/types';
import { FieldError } from 'react-hook-form';
import { ActionMeta } from 'react-select';

export type LocationAutoCompleteProps = {
  onChange: (
    option: MyOptionType | null,
    actionMeta: ActionMeta<MyOptionType>,
  ) => void;
  label: string;
  placeholder: string;
  value: MyOptionType | null;
  error?: FieldError;
  disabled?: boolean;
};
