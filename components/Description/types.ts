export type TextAareaProps = {
    height?: number;
};
export type DescriptionProps = {
    maxCharacters?: number;
    value: string;
    setValue: (e: string) => void;
    noLabel?: boolean;
    placeholder?: string;
    height?: number;
    label?: string;
  };
