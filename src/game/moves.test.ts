import { Client } from 'boardgame.io/client';
import { createGame } from '../testUtil';
import { GameState } from './gameTypes';

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
