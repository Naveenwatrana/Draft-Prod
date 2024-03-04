import React, { useState } from 'react';
import Select, { components, DropdownIndicatorProps } from 'react-select';
import DropdownIcon from 'components/Icons/dropdown.svg';
import { theme } from 'common/theme';
import { MyOptionType, SelectProps } from 'components/Select/types';
import {
  CustomLabel, ErrorText, InputWrapper, LabelText,
} from 'components/inputComp/styles';

const DropdownIndicator = (props: DropdownIndicatorProps<MyOptionType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <DropdownIcon />
    </components.DropdownIndicator>
  );
};

const SelectInput = ({
  options, id, labelText, placeHolder, onChange, value, error, onInputChange, isLoading, filterOption, defaultValue, disabled, clearable = true, ...props
}: SelectProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const handleInputChange = (newVal: string) => {
    if (onInputChange) {
      onInputChange(newVal);
      setTimeout(() => setInputValue(newVal), 500); // To load initial async options
      return;
    }
    setInputValue(newVal);
  };
  return (
    <InputWrapper>
      <CustomLabel htmlFor={id}>
        <LabelText>{labelText}</LabelText>
        <Select
          isClearable={clearable}
          isDisabled={disabled}
          options={options}
          isLoading={isLoading}
          instanceId={id}
          filterOption={filterOption}
          key={`${id}-${defaultValue?.label || ''}`}
          onInputChange={handleInputChange}
          value={options?.find((option) => option.label === value)}
          id={id}
          theme={(selectTheme) => ({
            ...selectTheme,
            colors: {
              ...selectTheme.colors,
              primary: theme.palette.white['100'].value,
            },
          })}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          defaultValue={defaultValue}
          placeholder={placeHolder}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: theme.palette.gray[50].value,
              borderRadius: 16,
              padding: '8px 12px',
              border: `1px solid ${error ? theme.palette.red['100'].value : theme.palette.gray['40'].value}`,
              color: theme.palette.white['100'].value,
            }),
            menuList: (provided) => ({
              ...provided,
              backgroundColor: theme.palette.gray[50].value,
              color: theme.palette.white['100'].value,
              display: (inputValue || !onInputChange) ? 'block' : 'none',
            }),
            option: (provided) => ({
              ...provided,
              botderBottom: `1px solid ${theme.palette.gray['10'].value}`,
              background: 'transparent',
              '&:hover': {
                background: theme.palette.gray['10'].value,
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              backgroundColor: theme.palette.gray[50].value,
              color: theme.palette.white['100'].value,
              fontSize: '16px',
              fontWeight: 300,
            }),
            input: (provided) => ({
              ...provided,
              color: theme.palette.white['100'].value,
            }),
            valueContainer: (provided) => ({
              ...provided,
              paddingLeft: 0,
            }),
            placeholder: (provided) => ({
              ...provided,
              fontSize: '16px',
              fontWeight: 300,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              textWrap: 'nowrap',
            }),
            clearIndicator: (provided) => ({
              ...provided,
              display: 'none',
            }),
          }}
          isMulti={false}
          onChange={onChange}
          {...props}
        />
      </CustomLabel>
      {error?.message && <ErrorText>{error.message}</ErrorText>}
    </InputWrapper>
  );
};

export default SelectInput;
