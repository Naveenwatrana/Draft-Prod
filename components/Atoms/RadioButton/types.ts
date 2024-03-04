export type RadioButtonProps = {
  label: string;
  name: string;
  checked: boolean | null;
  onCheck: (checked: boolean) => void;
};
