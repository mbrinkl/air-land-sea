import { Client } from 'boardgame.io/client';
import { Local } from 'boardgame.io/multiplayer';
import { AirLandSea } from '.';
import { GameState } from './gameTypes';

const createGame = () => ({
  game: AirLandSea,
  multiplayer: Local(),
});

let p0: ReturnType<typeof Client<GameState>>;
let p1: ReturnType<typeof Client<GameState>>;

describe('moves', () => {
  beforeEach(() => {
    const game = createGame();

    p0 = Client({ ...game, playerID: '0' });
    p1 = Client({ ...game, playerID: '1' });

    p0.start();
    p1.start();
  });

  describe('selectCard', () => {
    it('should set selected card ID in G', () => {
      p0.moves.selectCard(1);

      const state = p0.getState();

      expect(state?.G.selectedCardID).toBe(1);
    });
  });
});
