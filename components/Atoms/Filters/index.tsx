import CancelIcon from 'components/Icons/CrossIcon';
import { Filter, FiltersContainer } from './style';
import { FilterProps } from './types';
const Filters = ({ filters, onActive, activeColor = '#54ABAC' }: FilterProps) => {
  return (
    <FiltersContainer>
      {filters.map((filter) => (
        <Filter
          active={filter.active}
          key={filter.filter}
          onClick={() => onActive(filter.filter)}
          data-cy={`filter${filter.filter}`}
          activeColor={activeColor}
        >
          <span>{filter.label}</span>
          <CancelIcon size={12} />
        </Filter>
      ))}
    </FiltersContainer>
  );
};

export default Filters;
