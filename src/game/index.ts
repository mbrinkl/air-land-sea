import type { Game, Move } from 'boardgame.io';

export interface GameState {
  // aka 'G', your game's state
}

const move1: Move<GameState> = (G, ctx) => {};
const move2: Move<GameState> = (G, ctx) => {};

export const AirLandSea: Game<GameState> = {
  moves: { move1, move2 },
};
