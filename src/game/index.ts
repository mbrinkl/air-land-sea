import type { Game, Move } from 'boardgame.io';
import { GAME_ID } from '../config';
import { battleCards, TheaterType } from './cards';
import { CardInfo } from './cards';
import { getPointsScored } from './gameUtil';

export interface GameState {
  // aka 'G', your game's state
  players: Player[];
  secret: SecretInfo;
  theaters: TheaterType[];
}
export interface Player {
  ID: string;
  ready: boolean;
  firstPlayer: boolean;
  score: number;
  cards: CardInfo[];
}
export interface SecretInfo {
  deck: CardInfo[];
  discardPile: CardInfo[];
}

const selectCard: Move<GameState> = (G, ctx) => {};
const placeCardFaceDown: Move<GameState> = (G, ctx) => {};
const placeCardFaceUp: Move<GameState> = (G, ctx) => {};
const withdraw: Move<GameState> = (G, ctx) => {
  let lostPlayer = Number(ctx.currentPlayer);
  G.players[lostPlayer ^ 1].score += getPointsScored(
    G.players[lostPlayer].firstPlayer,
    G.players[lostPlayer].cards.length,
  );
};

export const AirLandSea: Game<GameState> = {
  name: GAME_ID,
  minPlayers: 2,
  maxPlayers: 2,

  setup: () => ({
    secret: { deck: battleCards, discardPile: [] },
    players: [
      { ID: '0', firstPlayer: true, cards: [], ready: false, score: 0 },
      { ID: '1', firstPlayer: false, cards: [], ready: false, score: 0 },
    ],
    theaters: ['air', 'land', 'sea'],
  }),

  phases: {
    shuffleAndDeal: {
      start: true,
      next: 'main',
      onBegin: (G, ctx) => {
        G.theaters = ctx.random!.Shuffle<TheaterType>(G.theaters);
        G.secret.deck = ctx.random!.Shuffle<CardInfo>(G.secret.deck);
        G.players[0].cards = G.secret.deck.splice(0, 6);
        G.players[1].cards = G.secret.deck.splice(0, 6);
        ctx.events?.endPhase();
      },
    },
    main: {
      turn: {
        order: {
          first: (G, ctx) => Number(G.players[0].firstPlayer ? '0' : '1'),
          next: (G, ctx) => Number(G.players[0].firstPlayer ? '1' : '0'),
        },
        stages: {
          select: { moves: { selectCard, withdraw } },
          place: { moves: { placeCardFaceDown, placeCardFaceUp } },
        },
      },
    },
  },
};
