import { configureStore } from '@reduxjs/toolkit';
import { boardReducer } from './board';
import { userReducer } from './user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
