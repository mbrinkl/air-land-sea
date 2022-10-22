import { createWrapper } from 'next-redux-wrapper';
import { configureStore, Store } from '@reduxjs/toolkit';
import { boardReducer } from './board';
import { userReducer } from './user';

const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

const makeStore = () => store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<Store<RootState>>(makeStore);
