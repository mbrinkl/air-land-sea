import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  hoveredCardInfo: string;
}

const initialState: IState = {
  hoveredCardInfo: '',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setHoveredCardInfo: (state, action: PayloadAction<string>) => {
      state.hoveredCardInfo = action.payload;
    },
  },
});
