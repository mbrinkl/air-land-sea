import type { Game } from 'boardgame.io';
import { GAME_ID } from '../config';
import { battleCards } from './cards';
import { CardInfo } from './cards';
import { GameState, Theater } from './gameTypes';
import { selectCard, withdraw, deploy, improvise } from './moves';

export const AirLandSea: Game<GameState> = {
  name: GAME_ID,
  minPlayers: 2,
  maxPlayers: 2,

  setup: () => ({
    secret: { deck: battleCards, discardPile: [] },
    selectedCardID: -1,
    players: [
      {
        ID: '0',
        firstPlayer: true,
        cards: [],
        ready: false,
        score: 0,
      },
      {
        ID: '1',
        firstPlayer: false,
        cards: [],
        ready: false,
        score: 0,
      },
    ],
    playingField: [
      { theater: 'air', deployedCards: { '0': [], '1': [] } },
      { theater: 'land', deployedCards: { '0': [], '1': [] } },
      { theater: 'sea', deployedCards: { '0': [], '1': [] } },
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
