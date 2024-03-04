import React, { useState } from 'react';
import { components, DropdownIndicatorProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import DropdownIcon from 'components/Icons/dropdown.svg';
import { theme } from 'common/theme';
import { CustomLabel, InputWrapper, LabelText } from 'components/inputComp/styles';
import { AsyncSelectProps, MyOptionType } from './types';
const DropdownIndicator = (props: DropdownIndicatorProps<MyOptionType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <DropdownIcon />
    </components.DropdownIndicator>
  );
};

const AsyncSelectInput = ({
  id,
  labelText,
  placeHolder,
  loadAsyncOption,
  onChange,
  value,
  height,
  color,
  borderColor,
  error = false,
  disabled = false,
  ...props
}: AsyncSelectProps) => {
  const [asyncInputVal, setAsyncInputVal] = useState<string>('');
  return (
    <InputWrapper>
      <CustomLabel htmlFor={id}>
        <LabelText>{labelText}</LabelText>
        <AsyncSelect
          isDisabled={disabled}
          isClearable
          instanceId={id}
          onInputChange={(newVal) => setAsyncInputVal(newVal)}
          cacheOptions
          loadOptions={loadAsyncOption}
          isMulti={false}
          value={value || null}
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
              backgroundColor: !disabled ? color || theme.palette.gray[50].value : 'transparent',
              borderRadius: 16,
              padding: '6px 12px',
              border: `1px solid ${
                error
                  ? theme.palette.red['100'].value
                  : borderColor || theme.palette.gray['40'].value
              }`,
              color: theme.palette.white['100'].value,
              height: height || 'auto',
              alignItems: 'flex-start',
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
              backgroundColor: !disabled ? theme.palette.gray['50'].value : provided.backgroundColor,
              color: !disabled ? theme.palette.white['100'].value : provided.color,
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
              color: !disabled ? provided.color : theme.palette.gray['30'].value,
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

export default AsyncSelectInput;
