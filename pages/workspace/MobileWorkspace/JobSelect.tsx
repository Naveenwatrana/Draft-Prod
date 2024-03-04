import Select, {
  OptionProps,
  SingleValue,
  components,
  DropdownIndicatorProps,
} from 'react-select';
import { theme } from 'common/theme';
import ArrowUp from 'components/Icons/ArrowUp.svg';
import ArrowDown from 'components/Icons/ArrowDown.svg';
import { JobSelectProps, Tabs, Option } from 'pages/workspace/type';

const DropdownIndicator = (props: DropdownIndicatorProps<Option>) => {
  const { selectProps: { menuIsOpen } } = props;

  return (
    <components.DropdownIndicator {...props}>
      {menuIsOpen ? <ArrowUp /> : <ArrowDown />}
    </components.DropdownIndicator>
  );
};

const JobSelect = ({ Options, currentTab, setCurrentTab }: JobSelectProps) => {
  return (
    <Select
      options={Options}
      placeholder=""
      isSearchable={false}
      defaultValue={Options.find((ele) => ele.value === Tabs.JOB)}
      id="location"
      instanceId="location"
      theme={(selectTheme) => ({
        ...selectTheme,
        colors: {
          ...selectTheme.colors,
          primary: theme.palette.white['100'].value,
        },
      })}
      value={Options.find((ele) => ele.value === currentTab)}
      onChange={(ele) => (ele as SingleValue<OptionProps>) && setCurrentTab(ele?.value as Tabs)}
      isMulti={false}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator,
      }}
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: theme.palette.gray['60'].value,
          borderRadius: 8,
          padding: 12,
          border: 'none',
          marginBottom: '26px',
          color: theme.palette.white['100'].value,
          cursor: 'pointer',
          justifyContent: 'center',
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: 9,
          background: 'none',
        }),
        menuList: (provided) => ({
          ...provided,
          borderRadius: 8,
          backgroundColor: theme.palette.gray['100'].value,
          color: theme.palette.white['100'].value,
        }),
        valueContainer: (provided) => ({
          ...provided,
          flex: 'none',
        }),
        option: (provided) => ({
          ...provided,
          borderRadius: 8,
          botderBottom: `1px solid ${theme.palette.gray['10'].value}`,
          background: 'transparent',
          cursor: 'pointer',
          '&:hover': {
            background: theme.palette.gray['60'].value,
          },
        }),
        singleValue: (provided) => ({
          ...provided,
          backgroundColor: theme.palette.gray['60'].value,
          color: theme.palette.white['100'].value,
          textAlign: 'center',
        }),
      }}
      data-cy="jobSelect"
    />
  );
};

export default JobSelect;
