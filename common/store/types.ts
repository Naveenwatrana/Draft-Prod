import type { makeStore } from 'common/store/store';
import { Action, ThunkAction } from '@reduxjs/toolkit';

export type RootState = ReturnType<AppStore['getState']>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
