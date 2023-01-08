import { Local } from 'boardgame.io/multiplayer';
import { AirLandSea } from '../game';
import { BoardProps } from 'boardgame.io/react';
import { GameState } from '../game/gameTypes';

export const createGame = () => ({
  game: AirLandSea,
  multiplayer: Local(),
});

export const createMockBoardProps = (): BoardProps<GameState> => ({
  G: {
    ...AirLandSea.setup!(
      {} as Parameters<NonNullable<(typeof AirLandSea)['setup']>>[0],
    ),
  },
  ctx: {
    numPlayers: 1,
    playOrder: ['0'],
    activePlayers: null,
    playOrderPos: 0,
    turn: 0,
    phase: '',
    currentPlayer: '0',
  },
  moves: {
    selectCard: vi.fn(),
    improvise: vi.fn(),
    deploy: vi.fn(),
    withdraw: vi.fn(),
  },
  matchData: [{ id: 0 }, { id: 1 }],
  events: {},
  plugins: {},
  playerID: '0',
  isActive: true,
  isConnected: true,
  isMultiplayer: true,
  matchID: 'default',
  log: [],
  deltalog: [],
  chatMessages: [],
  sendChatMessage: vi.fn(),
  redo: vi.fn(),
  undo: vi.fn(),
  reset: vi.fn(),
  _stateID: 0,
  _redo: [],
  _undo: [],
});
