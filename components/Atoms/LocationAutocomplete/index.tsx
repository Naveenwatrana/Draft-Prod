import React, { useMemo, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import debounce from 'lodash.debounce';
import SelectInput from 'components/Select/Select';
import { MyOptionType } from 'components/Select/types';

import { allowedLocalityCountries } from './const';
import { LocationAutoCompleteProps } from './types';

export const LocationAutoComplete = ({
  onChange,
  value: locationValue,
  placeholder,
  label,
  error,
  disabled,
}: LocationAutoCompleteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    options: {
      types: ['(cities)'],
      input: '',
    },
  });
  const options: MyOptionType[] = useMemo(() => {
    if (isLoading) setIsLoading(false);
    return placePredictions.map((pred) => {
      const countryName = pred?.terms?.at(-1)?.value || '';
      const value = allowedLocalityCountries.includes(countryName)
        ? pred.description
        : `${pred?.terms?.at(0)?.value}, ${countryName}`;
      return {
        label: value,
        value,
      };
    });
  }, [placePredictions]);

  const handleInputChange = debounce(getPlacePredictions, 500);
  return (
    <SelectInput
      labelText={label}
      id="location"
      placeHolder={placeholder}
      onInputChange={(value) => {
        if (value) {
          setIsLoading(true);
          handleInputChange({ input: value });
        }
      }}
      filterOption={() => !isLoading}
      data-cy="location"
      defaultValue={locationValue}
      onChange={onChange}
      options={options}
      error={error}
      disabled={disabled}
      isLoading={isLoading || isPlacePredictionsLoading}
    />
  );
};
