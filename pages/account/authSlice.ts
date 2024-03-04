import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthState, Company, Token, User,
} from 'pages/account/types';
import type { RootState } from 'common/store/types';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, currentCompany: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User | null; token: Token | null }>,
    ) => {
      state.user = user;
      state.token = token;
    },
    clearCredentials: (state) => {
      state.user = authSlice.getInitialState().user;
      state.token = authSlice.getInitialState().token;
      state.currentCompany = authSlice.getInitialState().currentCompany;
    },
    setCompany: (state, { payload: { currentCompany } }) => {
      state.currentCompany = currentCompany;
    },
    addCompanyProfile: (state, { payload: { company } } : PayloadAction<{ company: Company }>) => {
      state.user?.companies?.push(company);
      state.currentCompany = company;
    },
    setUserAuth: (state, { payload: user }) => {
      state.user = user;
    },
  },
});

export const {
  setCredentials, clearCredentials, setCompany, addCompanyProfile, setUserAuth,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentCompany = (state: RootState) => state.auth.currentCompany;
