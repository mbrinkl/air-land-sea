import type { Game } from 'boardgame.io';
import { TurnOrder } from 'boardgame.io/core';
import { GAME_ID } from '../config';
import { battleCards, Card } from './cards';
import { GameState, Theater } from './gameTypes';
import { selectCard, withdraw, deploy, improvise } from './moves';

export const AirLandSea: Game<GameState> = {
  name: GAME_ID,
  minPlayers: 2,
  maxPlayers: 2,

  setup: () => ({
    secret: { deck: battleCards, discardPile: [] },
    selectedCardID: -1,
    ongoingEffects: [],
    playOrder: ['0', '1'],
    players: [
      {
        ID: '0',
        firstPlayer: true,
        cards: [],
        ready: false,
        score: 0,
        ongoingEffects: [],
      },
      {
        ID: '1',
        firstPlayer: false,
        cards: [],
        ready: false,
        score: 0,
        ongoingEffects: [],
      },
    ],
    playingField: [
      {
        theater: 'air',
        deployedCards: { '0': [], '1': [] },
        totalStrength: { '0': 0, '1': 0 },
        isValid: false,
      },
      {
        theater: 'land',
        deployedCards: { '0': [], '1': [] },
        totalStrength: { '0': 0, '1': 0 },
        isValid: false,
      },
      {
        theater: 'sea',
        deployedCards: { '0': [], '1': [] },
        totalStrength: { '0': 0, '1': 0 },
        isValid: false,
      },
    ],
  }),

  phases: {
    shuffleAndDeal: {
      start: true,
      next: 'main',
      onBegin: ({ G, ctx, random, events }) => {
        G.playingField = random.Shuffle<Theater>(G.playingField);
        G.secret.deck = random.Shuffle<Card>(G.secret.deck);
        G.players[0].cards = G.secret.deck.splice(0, 6);
        G.players[1].cards = G.secret.deck.splice(0, 6);
        events.endPhase();
      },
    },
    main: {
      turn: {
        activePlayers: { currentPlayer: 'select' },
        order: TurnOrder.CUSTOM_FROM('playOrder'),
        stages: {
          select: { moves: { selectCard, withdraw } },
          place: { moves: { deploy, improvise } },
        },
      },
    },
    epicWinningAnimation: {
      onBegin: ({ G, ctx }) => {
        //something crazy idk
      },
    },
  },
};
