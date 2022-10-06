import type { Game, Move } from 'boardgame.io';
import { GAME_ID } from '../config';
import { battleCards, TheaterType } from './cards';
import { CardInfo } from './cards';
import { getPointsScored } from './gameUtil';

export interface GameState {
  // aka 'G', your game's state
  players: Player[];
  secret: SecretInfo;
  playingField: Theater[];
}
export interface Player {
  ID: string;
  ready: boolean;
  firstPlayer: boolean;
  score: number;
  cards: CardInfo[];
  selectedCardID: number;
}
export interface Theater {
  theater: TheaterType;
  deployedCards: DeployedCards[];
}
export interface DeployedCards {
  ID: string;
  cards: CardInfo[];
}
export interface SecretInfo {
  deck: CardInfo[];
  discardPile: CardInfo[];
}

const selectCard: Move<GameState> = (G, ctx, cardID: number) => {
  console.log(cardID);
  let playerID = Number(ctx.currentPlayer);
  G.players[playerID].selectedCardID = cardID;
  ctx.events?.setStage('place');
};
//play a card face-down to any theater
const improvise: Move<GameState> = (G, ctx) => {};

//play a card face-up to matching theater
const deploy: Move<GameState> = (G, ctx, theaterID: number) => {
  let playerID = Number(ctx.currentPlayer);
  G.playingField[theaterID].deployedCards[playerID].cards.push(
    ...G.players[playerID].cards.splice(G.players[playerID].selectedCardID, 1),
  );
  ctx.events?.endTurn();
};

//lose battle, opponent gains points based on how many cards you have left
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
      {
        ID: '0',
        firstPlayer: true,
        cards: [],
        ready: false,
        score: 0,
        selectedCardID: -1,
      },
      {
        ID: '1',
        firstPlayer: false,
        cards: [],
        ready: false,
        score: 0,
        selectedCardID: -1,
      },
    ],
    playingField: [
      {
        theater: 'air',
        deployedCards: [
          { ID: '0', cards: [] },
          { ID: '1', cards: [] },
        ],
      },
      {
        theater: 'land',
        deployedCards: [
          { ID: '0', cards: [] },
          { ID: '1', cards: [] },
        ],
      },
      {
        theater: 'sea',
        deployedCards: [
          { ID: '0', cards: [] },
          { ID: '1', cards: [] },
        ],
      },
    ],
  }),

  phases: {
    shuffleAndDeal: {
      start: true,
      next: 'main',
      onBegin: (G, ctx) => {
        G.playingField = ctx.random!.Shuffle<Theater>(G.playingField);
        G.secret.deck = ctx.random!.Shuffle<CardInfo>(G.secret.deck);
        G.players[0].cards = G.secret.deck.splice(0, 6);
        G.players[1].cards = G.secret.deck.splice(0, 6);
        ctx.events?.endPhase();
      },
    },
    main: {
      turn: {
        activePlayers: { currentPlayer: 'select' },
        order: {
          first: (G, ctx) => Number(G.players[0].firstPlayer ? '0' : '1'),
          next: (G, ctx) => Number(G.players[0].firstPlayer ? '1' : '0'),
        },
        stages: {
          select: { moves: { selectCard, withdraw } },
          place: { moves: { deploy, improvise } },
        },
      },
    },
  },
};
