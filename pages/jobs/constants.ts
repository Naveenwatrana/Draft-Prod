import { ICreateJobValues } from './create/types';

export const initialJobValues: ICreateJobValues = {
  role: '',
  location: { value: '', label: '' },
  description: '',
  locationType: '',
  jobType: '',
  salaryFrom: null,
  salaryTo: null,
  jobPicture: undefined,
  snapShotPicture: undefined,
  snapshotDescription: '',
};
