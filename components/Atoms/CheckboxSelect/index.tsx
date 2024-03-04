/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import ButtonComp from 'components/buttonComp';
import lang from 'common/lang';
import DropdownIcon from 'components/Icons/DropdownIcon';
import { IOption } from 'components/MultipleInputTextArea/types';
import { CheckboxSelectProps } from './types';
import {
  Buttons,
  SelectContainer,
  SelectDropdown,
} from './style';
import Checkboxes from './Checkboxes';

const {
  buttonText: { selectAll, clear },
} = lang;

const CheckboxSelect = ({
  onSelect,
  items,
  selected,
  selectLabel,
}: CheckboxSelectProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: IOption,
  ): void => {
    e.stopPropagation();
    onSelect(
      selected.includes(item.value)
        ? selected.filter((selectedItem) => selectedItem !== item.value)
        : [...selected, item.value],
    );
  };
  const handleSelectAll = () => {
    onSelect(items.map(({ value }) => value));
  };
  const handleClear = () => {
    onSelect([]);
  };
  const togglePopOver = () => setIsPopoverOpen(!isPopoverOpen);
  const closePopOver = () => setIsPopoverOpen(false);
  return (
    <Popover
      containerStyle={{
        marginTop: '13px',
        left: '6px',
      }}
      isOpen={isPopoverOpen}
      positions={['bottom']}
      padding={2}
      reposition={false}
      onClickOutside={closePopOver}
      content={() => (
        <SelectContainer>
          <Checkboxes
            onSelect={handleSelect}
            items={items}
            selected={selected}
            showSelected={false}
          />
          <Buttons>
            <ButtonComp
              label={selectAll}
              onClick={handleSelectAll}
              variant="link"
            />
            <ButtonComp label={clear} onClick={handleClear} variant="link" />
          </Buttons>
        </SelectContainer>
      )}
    >
      <SelectDropdown onClick={togglePopOver} active={isPopoverOpen} data-testid="selectCheckboxDropdown" data-cy="selectCheckboxDropdown">
        {`${selectLabel} (${selected.length})`}
        <DropdownIcon />
      </SelectDropdown>
    </Popover>
  );
};

export default CheckboxSelect;
