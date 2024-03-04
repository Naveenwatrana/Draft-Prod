import {
  AnyAction, combineReducers, configureStore, Middleware, Reducer,
} from '@reduxjs/toolkit';
import appSlice from 'common/store/appSlice';
import { rtkQueryErrorHandler } from 'common/utils/rtkErrorHandler';
import { baseApi } from 'common/store/baseApi';
import authSlice from 'pages/account/authSlice';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { RootState } from 'common/store/types';
import onboardingSlice from 'pages/pro/onboarding/mobile/onboardingSlice';
import jobsSlice from 'pages/jobs/forces/slice';
import workspaceSlice from 'pages/workspace/workspaceSlice';
import navbarSlice from 'components/NavBar/slice';
import CardCreationWizardSlice from 'components/CardCreationWizard/slice';
import profileSlice from 'pages/pro/profileSlice';

export const combinedReducer: Reducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  onBoarding: onboardingSlice,
  jobs: jobsSlice,
  workspace: workspaceSlice,
  navbar: navbarSlice,
  profile: profileSlice,
  cardCreationWizard: CardCreationWizardSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

const authMiddleware: Middleware = (store: RootState) => (next) => (action: AnyAction) => {
  const result = next(action);
  if (action.type?.startsWith('auth/')) {
    const authState = store.getState().auth;
    localStorage.setItem('auth', JSON.stringify(authState));
  }
  return result;
};

export const reducer: Reducer = (state: RootState, action: AnyAction): Reducer => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const reHydrateStore = () => {
  if (typeof window !== 'undefined') {
    const authData = localStorage.getItem('auth');
    if (authData !== null) {
      return { auth: JSON.parse(authData) }; // re-hydrate the store
    }
  }
};

export const makeStore = () => configureStore({
  preloadedState: reHydrateStore(),
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, rtkQueryErrorHandler, authMiddleware),
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const storeWrapper = createWrapper<AppStore>(makeStore, { debug: true });
