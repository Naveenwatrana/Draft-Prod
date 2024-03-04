import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'common/store/types';
import { ICreateJobValues } from '../create/types';

export type CounterState = {
    jobs: string[];
    selectedJob: null | ICreateJobValues;
  }

const initialState: CounterState = {
  jobs: [],
  selectedJob: null,
};
const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSelectedJob: (state, { payload: job }) => {
      state.selectedJob = {
        role: job.role,
        location: { value: job.location || '', label: job.location || '' },
        locationType: job.location_type,
        jobType: job.job_type,
        salaryFrom: job.salary_from,
        salaryTo: job.salary_to,
        description: job.description || '',
        jobPicture: null,
        snapShotPicture: job.snapshot_background,
        snapshotDescription: job.snapshot || '',
        backgroundImage: job.background,
      };
    },
  },
});

export const { setSelectedJob } = jobsSlice.actions;

export default jobsSlice.reducer;

export const selectSelectedJob = (state: RootState) => state.jobs.selectedJob;
