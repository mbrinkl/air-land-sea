import { createAction, createReducer } from '@reduxjs/toolkit';

// state
export interface IBoardState {
  hoveredCardInfo: string;
}

const preloadedState: IBoardState = {
  hoveredCardInfo: '',
};

// actions
export const setHoveredCardInfo = createAction<string>('board/hoveredCardInfo');

// reducers
export const boardReducer = createReducer(preloadedState, (builder) => {
  builder.addCase(setHoveredCardInfo, (state, action) => {
    state.hoveredCardInfo = action.payload;
  });
});
