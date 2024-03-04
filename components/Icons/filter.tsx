import { IconProps } from './types';

const FilterIcon = ({ ...rest }: IconProps) => {
  return (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path d="M11.2887 0.666016H0.62207V2.38987C0.62207 2.56668 0.692308 2.73625 0.817332 2.86128L4.42681 6.47075C4.55183 6.59578 4.62207 6.76535 4.62207 6.94216V9.99935L7.28874 11.9993V6.94216C7.28874 6.76535 7.35897 6.59578 7.484 6.47075L11.0935 2.86128C11.2185 2.73625 11.2887 2.56668 11.2887 2.38987V0.666016Z" stroke={rest.active ? "#f7f7f7" : "#282629"} stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default FilterIcon;
