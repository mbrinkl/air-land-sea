import { BoardProps } from 'boardgame.io/react';
import { createContext, useContext } from 'react';
import { GameState } from '../game/gameTypes';

export const BoardContext = createContext({} as BoardProps<GameState>);
export const useBoardContext = () => useContext(BoardContext);
