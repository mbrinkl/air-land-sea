import { createWrapper } from 'next-redux-wrapper';
import {
  configureStore,
  Store,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';

// state
interface State {
  activeCardDesc: string;
}

const preloadedState: State = {
  activeCardDesc: '',
};

// actions
export const setActiveCardDesc = createAction<string>('SET_ACTIVE_CARD_DESC');

// reducers
const rootReducer = createReducer(preloadedState, (builder) => {
  builder.addCase(setActiveCardDesc, (state, action) => {
    state.activeCardDesc = action.payload;
  });
});

// selectors
export const getActiveCardDesc = (state: State) => state.activeCardDesc;

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper<Store<State>>(makeStore);
