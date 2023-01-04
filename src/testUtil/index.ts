import { Local } from 'boardgame.io/multiplayer';
import { AirLandSea } from '../game';

export const createGame = () => ({
  game: AirLandSea,
  multiplayer: Local(),
});
