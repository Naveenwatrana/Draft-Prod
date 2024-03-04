import React from 'react';
import lang from 'common/lang';
import CheckboxIcon from 'components/Icons/CheckboxIcon';
import { CheckboxLabel } from 'components/input/styles';
import {
  CheckboxContainer, CheckboxItem, Item, SelectedCount,
} from './style';
import { CheckboxesProps } from './types';

const {
  buttonText: { selected: selectedText },
} = lang;

const Checkboxes = ({
  onSelect,
  items,
  selected,
  showSelected = true,
}: CheckboxesProps) => {
  return (
    <CheckboxContainer>
      {showSelected && (
        <Item>
          <SelectedCount>{`${selectedText}: ${selected.length}`}</SelectedCount>
        </Item>
      )}
      {items.map((item) => (
        <CheckboxItem key={item.value} onClick={(e) => onSelect(e, item)}>
          <CheckboxIcon checked={selected.includes(item.value)} />
          <CheckboxLabel>{item.label}</CheckboxLabel>
        </CheckboxItem>
      ))}
    </CheckboxContainer>
  );
};

export default Checkboxes;
