import type { Game, Move } from 'boardgame.io';
import { GAME_ID } from '../config';
import { battleCards } from './cards';
import { CardInfo } from './cards';

export interface GameState {
  // aka 'G', your game's state
  players: Player[];
  secret: SecretInfo;
}
export interface Player {
  ID: string;
  ready: boolean;
  firstPlayer: boolean;
  cards: CardInfo[];
}
export interface SecretInfo {
  deck: CardInfo[];
  discardPile: CardInfo[];
}

const selectCard: Move<GameState> = (G, ctx) => {};
const placeCardFaceDown: Move<GameState> = (G, ctx) => {};
const placeCardFaceUp: Move<GameState> = (G, ctx) => {};
const resign: Move<GameState> = (G, ctx) => {};
const shuffleAndDeal: Move<GameState> = (G, ctx) => {
  G.secret.deck = ctx.random!.Shuffle<CardInfo>(G.secret.deck);
  G.players[0].cards = G.secret.deck.splice(0, 6);
  G.players[1].cards = G.secret.deck.splice(0, 6);
};

export const AirLandSea: Game<GameState> = {
  name: GAME_ID,
  minPlayers: 2,
  maxPlayers: 2,

  setup: () => ({
    secret: { deck: battleCards, discardPile: [] },
    players: [
      { ID: '0', firstPlayer: true, cards: [], ready: false },
      { ID: '1', firstPlayer: false, cards: [], ready: false },
    ],
  }),

  phases: {
    shuffleAndDeal: {
      start: true,
      next: 'main',
      moves: { shuffleAndDeal },
    },
    main: {
      turn: {
        order: {
          first: (G, ctx) => Number(G.players[0].firstPlayer ? '0' : '1'),
          next: (G, ctx) => Number(G.players[0].firstPlayer ? '1' : '0'),
        },
        stages: {
          select: { moves: { selectCard, resign } },
          place: { moves: { placeCardFaceDown, placeCardFaceUp } },
        },
      },
    },
  },
};
