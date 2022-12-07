import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { joinMatch, leaveMatch } from '../api';
import { NICKNAME_STORAGE_KEY, PLAYER_STORAGE_KEY } from '../config/client';

export interface IJoinRoomParams {
  matchID: string;
  playerName: string;
}

export interface ILeaveRoomParams {
  matchID: string;
  playerID: string;
  credentials: string;
}

interface IRoomData {
  matchID: string;
  playerID: string;
  credentials: string;
}

interface IState {
  nickname: string | null;
  roomData: IRoomData | null;
}

const localRoomData = localStorage.getItem(PLAYER_STORAGE_KEY);

console.log('getting local', localRoomData);

const initialState: IState = {
  nickname: localStorage.getItem(NICKNAME_STORAGE_KEY),
  roomData: localRoomData && JSON.parse(localRoomData),
};

export const joinMatchThunk = createAsyncThunk<IRoomData, IJoinRoomParams>(
  'user/joinMatch',
  async (params) => {
    console.log('in join match thunk');
    const [playerID, credentials] = await joinMatch(params);
    return {
      matchID: params.matchID,
      playerID,
      credentials,
    };
  },
);

export const leaveMatchThunk = createAsyncThunk<void, ILeaveRoomParams>(
  'user/leaveMatch',
  async (params) => {
    await leaveMatch(params);
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
      localStorage.setItem(NICKNAME_STORAGE_KEY, action.payload);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(joinMatchThunk.fulfilled, (state, action) => {
        // Add user to the state array
        state.roomData = action.payload;
        localStorage.setItem(
          PLAYER_STORAGE_KEY,
          JSON.stringify(action.payload),
        );
      })
      .addCase(leaveMatchThunk.fulfilled, (state) => {
        // Add user to the state array
        state.roomData = null;
        localStorage.removeItem(PLAYER_STORAGE_KEY);
      });
  },
});
