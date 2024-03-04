import React from 'react';
import CancelIcon from 'components/Icons/CrossIcon';
import { Filter, FiltersContainer } from './style';
import { IFilter } from '../types';

type FeedFilterProps = {
  filters: IFilter[];
  onActive: (filter: string) => void;
};

const FeedFilters = ({ filters, onActive }: FeedFilterProps) => {
  return (
    <FiltersContainer>
      {filters.map((filter) => (
        <Filter
          active={filter.active}
          key={filter.filter}
          onClick={() => onActive(filter.filter)}
        >
          <span>{filter.label}</span>
          <CancelIcon size={12} />
        </Filter>
      ))}
    </FiltersContainer>
  );
};

export default FeedFilters;
