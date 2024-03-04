import { IOption } from 'components/MultipleInputTextArea/types';
import { FieldError } from 'react-hook-form';
import { ActionMeta } from 'react-select';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';

export type MyOptionType = { label: string, value: string }
export type SelectProps = {
  options: Array<MyOptionType>;
  id: string;
  labelText?: string | null;
  placeHolder: string;
  value?: string;
  defaultValue?: MyOptionType | null;
  error?: FieldError;
  onChange?: (option: MyOptionType | null, actionMeta: ActionMeta<MyOptionType>) => void;
  onInputChange?: (val: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  filterOption?: ((option: FilterOptionOption<MyOptionType>, inputValue: string) => boolean) | null;
};

export type AsyncSelectProps = {
  value?: IOption | null;
  options?: Array<MyOptionType>;
  loadAsyncOption?: (inputValue: string, callback: (options: IOption[]) => void) => void;
  id: string;
  labelText: string;
  placeHolder: string;
  error?: boolean;
  disabled?: boolean;
  height?: number;
  color?: string;
  borderColor?: string;
  onChange?: (option: MyOptionType | null, actionMeta: ActionMeta<MyOptionType>) => void;
  onInputChange?: (val: string) => void;
  isLoading?: boolean;
};

export type AsyncCreatableSelectProps = {
  onCreateOption : (e: string) => void;
}
