import type { AiEnumerate, Game } from 'boardgame.io';
import { TurnOrder } from 'boardgame.io/core';
import { battleCards, Card } from './cards';
import { GameState, Theater } from './gameTypes';
import { selectCard, withdraw, deploy, improvise } from './moves';

export const AirLandSea: Game<GameState> = {
  name: 'AirLandSea',
  minPlayers: 2,
  maxPlayers: 2,

  setup: () => ({
    secret: { deck: battleCards, discardPile: [] },
    selectedCardID: -1,
    ongoingEffects: {},
    playOrder: ['0', '1'],
    players: {
      '0': {
        ID: '0',
        firstPlayer: true,
        cards: [],
        ready: false,
        score: 0,
        ongoingEffects: {},
      },
      '1': {
        ID: '1',
        firstPlayer: false,
        cards: [],
        ready: false,
        score: 0,
        ongoingEffects: {},
      },
    },
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
      onBegin: ({ G, random, events }) => {
        G.playingField = random.Shuffle<Theater>(G.playingField);
        G.secret.deck = random.Shuffle<Card>(G.secret.deck);
        G.players['0'].cards = G.secret.deck.splice(0, 6);
        G.players['1'].cards = G.secret.deck.splice(0, 6);
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
          //cardEffect: { moves: {} }, //guessing this'll be needed for instant effects
        },
      },
    },
  },

  // Random Choice Bot (never withdraws, not a coward)
  ai: {
    enumerate: (G, ctx) => {
      const choices: AiEnumerate = [];

      const bot = G.players[1];
      const stage = ctx.activePlayers?.[1];

      const loadPossibleSelections = () => {
        const numCards = bot.cards.length;
        for (let i = 0; i < numCards; i++) {
          choices.push({ move: 'selectCard', args: [i] });
        }
      };

      const loadPossiblePlacements = () => {
        G.playingField.forEach(({ isValid }, i) => {
          choices.push({ move: 'improvise', args: [i] });
          if (isValid) {
            choices.push({ move: 'deploy', args: [i] });
          }
        });
      };

      switch (stage) {
        case 'select':
          loadPossibleSelections();
          break;
        case 'place':
          loadPossiblePlacements();
          break;
        default:
          break;
      }

      return choices;
    },
  },
};
