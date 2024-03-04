import { MouseEvent, TouchEvent } from 'react';
import { FieldError } from 'react-hook-form';

export type MultiInputProps = {
  inputs: string[];
  onChange: (inputs: string[]) => void;
  error?: FieldError;
  inputPlaceholder: string;
  buttonText: string;
};

export type InputContainerProps = {
  hidden?: boolean;
};

export type InputProps = {
  input: string;
  onChange: (val: string) => void;
  error?: FieldError;
  placeholder: string;
};

export type IMultiInputItem = {
  id: number,
  index: number,
  input: string,
  inputPlaceholder: string,
  onDelete: (id: number) => void;
  onInputChange: (input: string, id: number) => void;
  error?: FieldError;
}

export type ItemProps = {
  item: IMultiInputItem,
  dragHandleProps: {
    onMouseDown: (e: MouseEvent<SVGSVGElement>) => void
    onTouchStart: (e: TouchEvent<SVGSVGElement>) => void
  };
}
