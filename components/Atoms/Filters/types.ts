export type IFilter = {
  filter: string;
  label: string;
  active: boolean;
};

export type FilterProps = {
  filters: IFilter[];
  activeColor?: string;
  onActive: (filter: string) => void;
};

export type StyledFilterProps = {
  active: boolean;
  activeColor: string;
};
