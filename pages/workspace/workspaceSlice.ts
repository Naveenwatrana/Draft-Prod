import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'common/store/types';
import { Tabs } from './type';

export type WorkspaceState = {
    currentTab: number;
  }

const initialState: WorkspaceState = {
  currentTab: Tabs.SAVED,
};
const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setCurrentTab: (state, { payload: currentTab }) => {
      state.currentTab = currentTab;
    },
  },
});

export const { setCurrentTab } = workspaceSlice.actions;

export default workspaceSlice.reducer;

export const getCurrentTab = (state: RootState) => state.workspace.currentTab;
