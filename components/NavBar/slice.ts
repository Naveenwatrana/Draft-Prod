import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'common/store/types';

export type NavBarState = {
  searchTerm: string;
};

const initialState: NavBarState = {
  searchTerm: '',
};
const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setSearchTerm: (state, { payload: searchTerm }) => {
      state.searchTerm = searchTerm;
    },
  },
});

export const { setSearchTerm } = navbarSlice.actions;

export default navbarSlice.reducer;

export const getSearchTerm = (state: RootState) => state.navbar.searchTerm;
