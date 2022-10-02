import type { Game, Move } from 'boardgame.io';
import { GAME_ID } from '../config';

export interface GameState {
  // aka 'G', your game's state
}

const move1: Move<GameState> = (G, ctx) => {};
const move2: Move<GameState> = (G, ctx) => {};

export const AirLandSea: Game<GameState> = {
  name: GAME_ID,
  minPlayers: 2,
  maxPlayers: 2,
  moves: { move1, move2 },
};
