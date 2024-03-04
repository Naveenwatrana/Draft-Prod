export type TagSelectProps = {
  label: string;
  isSelected: boolean;
  toggleSelect?: () => void;
  cancelSelect?: () => void;
  withCrossIcon?: boolean;
  withCheckIcon?: boolean;
  icon?: JSX.Element;
  cancelable?: boolean;
};

export type StyledTagProps = {
  isSelected: boolean;
  cancelable?: boolean;
};
