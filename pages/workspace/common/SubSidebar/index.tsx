import React from 'react';
import { CheckboxItem } from 'components/Atoms/CheckboxSelect/style';
import CheckboxIcon from 'components/Icons/CheckboxIcon';
import { CheckboxLabel } from 'components/input/styles';
import lang from 'common/lang';
import { SideBarFilters, SubSidebarProps } from './types';
import {
  SideBarItem, SidebarContainer,
  Subtitle, FilterSubtitle,
} from './style';
import SelectInput from '../../../../components/Select/Select';
const {
  workspace: {
    filterTitle,
  },
} = lang;
const SubSidebar = ({
  selected, onSelect, items, title, checkbox, children, filters,
}: SubSidebarProps) => {
  return (
    <SidebarContainer>
      {title && <Subtitle>{title}</Subtitle> }
      {checkbox ? items?.map((item) => (
        <CheckboxItem
          key={item}
          onClick={() => onSelect && onSelect(item)}
        >
          <CheckboxIcon checked={selected === item} />
          <CheckboxLabel>{item}</CheckboxLabel>
        </CheckboxItem>
      )) : items?.map((item) => (
        <SideBarItem
          selected={selected === item}
          onClick={() => onSelect && onSelect(item)}
          key={`subSidebarItem${item}`}
          data-cy={`subSidebarItem${item}`}
        >
          {item}
        </SideBarItem>
      ))}
      {filters && filters.length > 0 && <FilterSubtitle>{filterTitle}</FilterSubtitle> }
      {filters && filters.length > 0 && filters.map((fltr:SideBarFilters) => (
        <SelectInput
          key={fltr.type}
          options={fltr.options}
          labelText={null}
          id={fltr.type}
          placeHolder={fltr.label}
          onChange={() => {}}
        />
      ))}
      {children}
    </SidebarContainer>
  );
};

export default SubSidebar;
