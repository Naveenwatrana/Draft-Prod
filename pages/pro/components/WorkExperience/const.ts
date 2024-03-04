import lang from 'common/lang';

const {
  profile: {
    block: {
      workExperience: {
        form: { roleType },
      },
    },
  },
} = lang;

export const employmentTypeOptions = [
  {
    label: 'Full-time',
    value: 'Full-time',
  },
  {
    label: 'Part-time',
    value: 'Part-time',
  },
  {
    label: 'Freelance',
    value: 'Freelance',
  },
  {
    label: 'Contract',
    value: 'Contract',
  },
  {
    label: 'Self-employed',
    value: 'Self-employed',
  },
  {
    label: 'Internship',
    value: 'Internship',
  },
  {
    label: 'Apprenticeship',
    value: 'Apprenticeship',
  },
  {
    label: 'Temporary',
    value: 'Temporary',
  },
];

export const locationTypeOptions = [
  {
    label: 'On-site',
    value: 'On-site',
  },
  {
    label: 'Hybrid',
    value: 'Hybrid',
  },
  {
    label: 'Remote',
    value: 'Remote',
  },
];

export const roleTypeOptions = [
  {
    label: 'Individual contributor',
    value: 'Individual contributor',
  },
  {
    label: roleType.peopleManager,
    value: roleType.peopleManager,
  },
];

export const totalPeopleManagedOptions = [
  {
    label: '1-10',
    value: '1-10',
  },
  {
    label: '11-50',
    value: '11-50',
  },
  {
    label: '51-100',
    value: '51-100',
  },
  {
    label: '101-500',
    value: '101-500',
  },
  {
    label: '500+',
    value: '500+',
  },
];
