import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CounterState = {
  header: string;
}

const initialState: CounterState = {
  header: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHeader: (state, { payload }: PayloadAction<string>) => {
      state.header = payload;
    },
  },
});

export const { setHeader } = appSlice.actions;

export default appSlice.reducer;
