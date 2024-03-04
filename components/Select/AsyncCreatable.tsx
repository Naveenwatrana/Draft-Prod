import React, { useState } from 'react';
import { components, DropdownIndicatorProps } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import DropdownIcon from 'components/Icons/dropdown.svg';
import { theme } from 'common/theme';
import { CustomLabel, InputWrapper, LabelText } from 'components/inputComp/styles';
import { AsyncCreatableSelectProps, AsyncSelectProps, MyOptionType } from './types';
const DropdownIndicator = (props: DropdownIndicatorProps<MyOptionType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <DropdownIcon />
    </components.DropdownIndicator>
  );
};

const AsyncCreatableSelectInput = ({
  id,
  labelText,
  placeHolder,
  loadAsyncOption,
  onChange,
  value,
  error = false,
  onCreateOption,
  ...props
}: AsyncSelectProps & AsyncCreatableSelectProps) => {
  const [asyncInputVal, setAsyncInputVal] = useState<string>('');
  return (
    <InputWrapper>
      <CustomLabel htmlFor={id}>
        <LabelText>{labelText}</LabelText>
        <AsyncCreatableSelect
          isClearable
          instanceId={id}
          formatCreateLabel={(label) => `"${label}"`}
          onCreateOption={onCreateOption}
          onInputChange={(newVal) => setAsyncInputVal(newVal)}
          cacheOptions
          loadOptions={loadAsyncOption}
          isMulti={false}
          value={value}
          onChange={onChange}
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
          placeholder={placeHolder}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: theme.palette.gray[50].value,
              borderRadius: 8,
              padding: '8px 12px',
              border: `1px solid ${
                error
                  ? theme.palette.red['100'].value
                  : theme.palette.gray['40'].value
              }`,
              color: theme.palette.white['100'].value,
            }),
            menuList: (provided) => ({
              ...provided,
              backgroundColor: theme.palette.gray[50].value,
              color: theme.palette.white['100'].value,
              display: asyncInputVal ? 'block' : 'none',
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
            }),
            clearIndicator: (provided) => ({
              ...provided,
              display: 'none',
            }),
          }}
          id={id}
          {...props}
        />
      </CustomLabel>
    </InputWrapper>
  );
};

export default AsyncCreatableSelectInput;
