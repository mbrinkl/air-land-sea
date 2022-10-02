import { useContext, createContext } from 'react';
import { BoardProps } from 'boardgame.io/react';
import { GameState } from '../game';

export const BoardContext = createContext({} as BoardProps<GameState>);
export const useBoardContext = () => useContext(BoardContext);

export const Board = (boardProps: BoardProps<GameState>): JSX.Element => {
  return (
    <BoardContext.Provider value={boardProps}>
      <div>
        <h1>todo: board</h1>
      </div>
    </BoardContext.Provider>
  );
};
