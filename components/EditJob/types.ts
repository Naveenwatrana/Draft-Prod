export enum EDIT_JOB_VIEW_TYPE {
    MAIN = 'main',
    SKILLS = 'skills',
    ROLE = 'role',
    SALARY = 'salary',
    LOCATION = 'location',
    EXPERIENCE = 'experience',
    LANGUAGES = 'languages',
    WHOYOUARE = 'whoyouare',
    WHATWILLYOUDO = 'whatwillyoudo',
}

export const EDIT_JOB_DATA = [
  {
    title: 'Role',
    isOptional: false,
    value: EDIT_JOB_VIEW_TYPE.ROLE,
  },
  {
    title: 'Salary',
    isOptional: false,
    value: EDIT_JOB_VIEW_TYPE.SALARY,
  },
  {
    title: 'Skills',
    isOptional: false,
    value: EDIT_JOB_VIEW_TYPE.SKILLS,
  },
  {
    title: 'Experience',
    isOptional: false,
    value: EDIT_JOB_VIEW_TYPE.EXPERIENCE,
  },
  {
    title: 'Location',
    isOptional: false,
    value: EDIT_JOB_VIEW_TYPE.LOCATION,
  },
  {
    title: 'Languages',
    isOptional: true,
    value: EDIT_JOB_VIEW_TYPE.LANGUAGES,
  },
];
