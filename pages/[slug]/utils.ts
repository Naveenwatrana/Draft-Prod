import lang from 'common/lang';
import { JOB_VIEW_TYPE } from 'common/types';
const { jobs } = lang;
export const jobTabs = [
  {
    name: jobs.jobHeader.edit,
    onClick: '',
    value: JOB_VIEW_TYPE.JOB,
  },
  {
    name: jobs.jobHeader.applicants,
    onClick: JOB_VIEW_TYPE.APPLICATIONS,
    value: JOB_VIEW_TYPE.APPLICATIONS,
  },
  {
    name: jobs.jobHeader.messages,
    onClick: JOB_VIEW_TYPE.MESSAGES,
    value: JOB_VIEW_TYPE.MESSAGES,
  },
  {
    name: jobs.jobHeader.sourcing,
    onClick: JOB_VIEW_TYPE.SOURCING,
    value: JOB_VIEW_TYPE.SOURCING,
  },
];
