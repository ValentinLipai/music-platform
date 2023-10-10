import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { playerSlice } from '@/store/slices';
import { trackApi } from '@/store/querySlices';

export const makeStore = () =>
  configureStore({
    reducer: {
      [playerSlice.name]: playerSlice.reducer,
      [trackApi.reducerPath]: trackApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(trackApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type AppDispatch = AppStore['dispatch'];

export const storeWrapper = createWrapper<AppStore>(makeStore);
