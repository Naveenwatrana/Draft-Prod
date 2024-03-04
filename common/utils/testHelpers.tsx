import {
  render, RenderOptions, RenderResult,
} from '@testing-library/react';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { rtkQueryErrorHandler } from 'common/utils/rtkErrorHandler';
import { baseApi } from 'common/store/baseApi';
import { Provider } from 'react-redux';
import { RootState } from 'common/store/types';
import { reducer } from 'common/store/store';
import { ReactElement, ReactNode } from 'react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/theme';

type RenderOptionsWithRedux = RenderOptions & {
  preloadedState?: Partial<RootState>;
  store?: EnhancedStore;
  renderOptions?: RenderOptions;
};

type RenderResultWithEvents = RenderResult & {
  user: UserEvent;
};

const getDefaultStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(baseApi.middleware, rtkQueryErrorHandler),
  preloadedState,
});

export const withStore = (
  component: ReactElement,
  {
    preloadedState,
    store = getDefaultStore(preloadedState),
  }: RenderOptionsWithRedux = {},
): ReactElement => {
  return <Provider store={store}>{component}</Provider>;
};

export const renderWithThemeStoreEvents = (
  component: ReactElement,
  {
    preloadedState,
    store = getDefaultStore(preloadedState),
    ...renderOptions
  }: RenderOptionsWithRedux = {},
): RenderResultWithEvents => {
  const Wrapper = ({ children }: {
    children?: ReactNode;
  }) => {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {children}
        </Provider>
      </ThemeProvider>
    );
  };

  return {
    user: userEvent.setup(),
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
};

export const renderWithTheme = (
  component: ReactElement,
) => {
  return {
    ...render((
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    )),
  };
};
