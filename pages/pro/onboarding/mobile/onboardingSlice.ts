import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'common/store/types';

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    fullName: undefined,
    mantra: undefined,
    image: undefined,
    bio: undefined,
    project: undefined,
  },
  reducers: {
    setUserFullName: (state, { payload: fullName }) => {
      state.fullName = fullName;
    },
    setUserMantra: (state, { payload: mantra }) => {
      state.mantra = mantra;
    },
    setUserImage: (state, { payload: image }) => {
      state.image = image;
    },
    setUserBio: (state, { payload: bio }) => {
      state.bio = bio;
    },
    setUserProject: (state, { payload: project }) => {
      state.project = project;
    },
  },
});

export const {
  setUserFullName,
  setUserMantra,
  setUserImage,
  setUserBio,
  setUserProject,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;

export const selectOnboardingData = (state: RootState) => state.onBoarding;
