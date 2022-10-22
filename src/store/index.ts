import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './board';
import { userSlice } from './user';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    board: boardSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
