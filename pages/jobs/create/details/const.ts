import lang from 'common/lang';

const {
  jobs: {
    officeDaysPerWeeks,
    regionsOptions: { regions, countries },
  },
} = lang;
export const officeDaysPerWeekOptions = [
  {
    label: officeDaysPerWeeks.occasionally,
    value: officeDaysPerWeeks.occasionally,
  },
  {
    label: officeDaysPerWeeks.setOfficeDaysPerWeek,
    value: officeDaysPerWeeks.setOfficeDaysPerWeek,
  },
];

export const minimumOfficeDaysPerWeekOptions = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
];

export const regionsOptions = [
  {
    label: regions.title,
    options: [
      { label: regions.amaricas, value: regions.amaricas },
      { label: regions.apac, value: regions.apac },
      { label: regions.eur, value: regions.eur },
      {
        label: regions.emea,
        value: regions.emea,
      },
      { label: regions.latam, value: regions.latam },
      { label: regions.na, value: regions.na },
      { label: regions.worldwide, value: regions.worldwide },
    ],
  },
  {
    label: countries.title,
    options: [
      { label: countries.AUT, value: countries.AUT },
      { label: countries.AUS, value: countries.AUS },
      { label: countries.CAN, value: countries.CAN },
      { label: countries.BEL, value: countries.BEL },
      { label: countries.DNK, value: countries.DNK },
      { label: countries.FRA, value: countries.FRA },
      { label: countries.DEU, value: countries.DEU },
      { label: countries.HKG, value: countries.HKG },
      { label: countries.IRL, value: countries.IRL },
      { label: countries.IND, value: countries.IND },
      { label: countries.JPN, value: countries.JPN },
      { label: countries.MYS, value: countries.MYS },
      { label: countries.NLD, value: countries.NLD },
      { label: countries.NZL, value: countries.NZL },
      { label: countries.PRT, value: countries.PRT },
      { label: countries.SGP, value: countries.SGP },
      { label: countries.ESP, value: countries.ESP },
      { label: countries.CHE, value: countries.CHE },
      {
        label: countries.UAE,
        value: countries.UAE,
      },
      { label: countries.US, value: countries.US },
      { label: countries.UK, value: countries.UK },
    ],
  },
];
