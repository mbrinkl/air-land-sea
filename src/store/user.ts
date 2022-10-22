import { createAction, createReducer } from '@reduxjs/toolkit';
import { NICKNAME_STORAGE_KEY, PLAYER_STORAGE_KEY } from 'config/client';

interface IRoomData {
  matchID: string;
  playerID: string;
  credentials: string;
}

// state
export interface IUserState {
  nickname: string | null;
  roomData: IRoomData | null;
}
const hasWindow = typeof window !== 'undefined';
const localRoomData = hasWindow
  ? localStorage.getItem(PLAYER_STORAGE_KEY)
  : null;

const preloadedState: IUserState = {
  nickname: hasWindow ? localStorage.getItem(NICKNAME_STORAGE_KEY) : null,
  roomData: localRoomData && JSON.parse(localRoomData),
};

// actions
export const setNickname = createAction<string>('user/nickname');
export const setRoomData = createAction<IRoomData>('user/roomData');

// reducers
export const userReducer = createReducer(preloadedState, (builder) => {
  builder.addCase(setNickname, (state, action) => {
    state.nickname = action.payload;
  });
  builder.addCase(setRoomData, (state, action) => {
    state.roomData = action.payload;
  });
});
