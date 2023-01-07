import type { AiEnumerate, Game } from 'boardgame.io';
import { TurnOrder } from 'boardgame.io/core';
import { battleCards, TheaterType } from './cards';
import { GameState, Player, Theater } from './gameTypes';
import { selectCard, withdraw, deploy, improvise } from './moves';

const setupPlayers = (): Record<string, Player> => {
  const players = {} as Record<string, Player>;

  for (let i = 0; i < 2; i++) {
    const ID = i.toString();
    players[ID] = {
      ID,
      firstPlayer: ID === '0',
      cards: [],
      ready: false,
      score: 0,
      ongoingEffects: {},
    };
  }

  return players;
};

const setupTheaters = (): Theater[] => {
  const theaterTypes: TheaterType[] = ['air', 'land', 'sea'];

  return theaterTypes.map((theater) => ({
    theater,
    deployedCards: { '0': [], '1': [] },
    totalStrength: { '0': 0, '1': 0 },
    isValid: false,
  }));
};

export const AirLandSea: Game<GameState> = {
  name: 'AirLandSea',
  minPlayers: 2,
  maxPlayers: 2,

  setup: () => ({
    secret: { deck: battleCards, discardPile: [] },
    selectedCardID: -1,
    ongoingEffects: {},
    playOrder: ['0', '1'],
    players: setupPlayers(),
    playingField: setupTheaters(),
  }),

  phases: {
    main: {
      start: true,
      next: 'main',
      onBegin: ({ G, random }) => {
        G.playingField = random.Shuffle(G.playingField);
        G.secret.deck = random.Shuffle(battleCards);
        G.secret.discardPile = [];
        G.players['0'].cards = G.secret.deck.splice(0, 6);
        G.players['1'].cards = G.secret.deck.splice(0, 6);
      },
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
  endIf: ({ G }) => {
    if (G.players['0'].score >= 12) return { winner: '0' };
    if (G.players['1'].score >= 12) return { winner: '1' };
  },
};
