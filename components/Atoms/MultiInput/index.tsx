import React, {
  useCallback,
  useEffect, useRef, useState,
} from 'react';
import DraggableList from 'react-draggable-list';
import AddIcon from 'components/Icons/AddIcon';
import { FieldError } from 'react-hook-form';
import { IMultiInputItem, MultiInputProps } from './type';
import { ButtonContainer, ButtonTypography, Container } from './style';
import Item from './Item';
const MultiInput = ({
  inputs,
  onChange,
  error,
  inputPlaceholder,
  buttonText,
}: MultiInputProps) => {
  const containerRef = useRef<HTMLFormElement>(null);
  const onDelete = useCallback((id: number) => {
    setItems((itemsToUpdate) => itemsToUpdate.filter((item: { id: number }) => {
      return item.id !== id;
    }));
  }, []);
  const onListChange = useCallback((newList: IMultiInputItem[]) => {
    setItems(
      newList.map((listToUpdate, index: number) => {
        return {
          ...listToUpdate,
          index,
        };
      }),
    );
  }, []);

  const onInputChange = useCallback((e: string, id: number) => {
    setItems((itemsToUpdate) => itemsToUpdate.map((item) => {
      return item.id === id ? { ...item, input: e } : { ...item };
    }));
  }, []);
  const defaultItem = {
    id: 1,
    index: 0,
    input: '',
    inputPlaceholder,
    onDelete,
    onInputChange,
    error,
  };
  const [items, setItems] = useState<IMultiInputItem[]>([defaultItem]);
  const makeNewItem = useCallback(() => {
    const lastItem = items?.[items.length - 1];
    setItems([
      ...items,
      {
        id: (lastItem?.id || 0) + 1,
        index: lastItem?.id || 0,
        input: '',
        inputPlaceholder,
        onDelete,
        onInputChange,
        error,
      },
    ]);
  }, [error, inputPlaceholder, items, onDelete, onInputChange]);
  useEffect(() => {
    onChange(items?.filter((item) => item.input).map((item) => item.input.trim()));
  }, [items]);

  useEffect(() => {
    if (inputs && inputs.length) {
      // eslint-disable-next-line max-len
      const inputValues: { id: number; index: number; input: string; inputPlaceholder: string; onDelete: (id: number) => void; onInputChange: (e: string, id: number) => void; error: FieldError | undefined; }[] = [];
      inputs.forEach((element, index) => {
        const value = {
          id: index + 1,
          index,
          input: element,
          inputPlaceholder,
          onDelete,
          onInputChange,
          error,
        };
        inputValues.push(value);
      });
      setItems([...inputValues]);
    }
  }, []);

  return (
    <Container>
      {!!items?.length && (
        <DraggableList
          itemKey="id"
          template={Item as any} // TODO: Add type
          list={items}
          onMoveEnd={(newList: any /* TODO: Add type */) => onListChange(newList as IMultiInputItem[])}
          container={() => containerRef.current}
        />
      )}
      <ButtonContainer onClick={makeNewItem}>
        <AddIcon />
        <ButtonTypography data-cy={buttonText}>{buttonText}</ButtonTypography>
      </ButtonContainer>
    </Container>
  );
};

export default MultiInput;
