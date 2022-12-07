import { isProduction, DEFAULT_PORT } from '.';

export const SERVER_URL = isProduction
  ? 'https://air-land-and-sea.herokuapp.com'
  : `http://localhost:${DEFAULT_PORT}`;

// nickname is used between games to simplify room user creation
export const NICKNAME_STORAGE_KEY = 'airlandsea_nickname';

// 'player' refers to users player in the game room
export const PLAYER_STORAGE_KEY = 'airlandsea_player';
