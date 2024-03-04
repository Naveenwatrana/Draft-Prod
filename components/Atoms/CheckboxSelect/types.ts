import { IOption } from 'components/MultipleInputTextArea/types';

export type CheckboxSelectProps = {
  items: IOption[];
  selected: string[];
  onSelect: (items: string[]) => void;
  selectLabel: string;
};

export type CheckboxesProps = {
  items: IOption[];
  selected: string[];
  showSelected?: boolean;
  onSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, option: IOption) => void;
};

export type SelectDropdownProps = {
  active?: boolean;
};
