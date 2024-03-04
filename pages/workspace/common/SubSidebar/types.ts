import { MyOptionType } from 'components/Select/types';
import { ReactElement } from 'react';

export type SubSidebarProps = {
  selected?: string;
  onSelect?: (step: string) => void;
  items?: string[];
  title?: string;
  checkbox?: boolean;
  children?: ReactElement | ReactElement[];
  filters?: SideBarFilters[] | undefined;
};

export type SideBarFilters = {
  type: string;
  label: string;
  options: MyOptionType[];
};

export type SideBarItemProps = {
  selected: boolean;
};
