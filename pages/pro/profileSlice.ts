import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'common/store/types';
import { MyOptionType } from 'components/Select/types';

export type ProfileState = {
  name: string;
  username: string;
  firstName: string;
  lastName: string;
  location: MyOptionType;
  followers: number;
  following: number;
  isCurrentUser: boolean;
  isEditing: boolean;
  filters: string[];
};

const initialState: ProfileState = {
  name: '',
  username: '',
  firstName: '',
  lastName: '',
  location: { label: '', value: '' },
  followers: 0,
  following: 0,
  isCurrentUser: false,
  isEditing: false,
  filters: [],
};
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserInfo: (state, { payload: user }) => {
      state.name = user.name;
      state.username = user.username;
      state.followers = user.followers_count;
      state.following = user.followings_count;
      state.firstName = user.first_name;
      state.lastName = user.last_name;
      state.location = user.location;
    },
    setIsCurrentUser: (state, { payload: isCurrentUser }) => {
      state.isCurrentUser = isCurrentUser;
    },
    setIsEditing: (state, { payload: isEditing }) => {
      state.isEditing = isEditing;
    },
    setFilters: (state, { payload: filters }) => {
      state.filters = filters;
    },
  },
});

export const {
  setUserInfo, setIsCurrentUser, setIsEditing, setFilters,
} = profileSlice.actions;

export default profileSlice.reducer;

export const getUsername = (state: RootState) => state.profile.name;

export const getUser = (state: RootState) => state.profile;

export const getIsCurrentUser = (state: RootState) => state.profile.isCurrentUser;

export const isUserEditing = (state: RootState) => state.profile.isEditing;

export const getFilters = (state: RootState) => state.profile.filters;
