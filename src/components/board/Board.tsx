import { useContext, createContext } from 'react';
import { BoardProps } from 'boardgame.io/react';
import { GameState } from '../../game/gameTypes';
import { Hand } from './Hand';
import { TheaterRow } from './TheaterRow';
import { GameInfo } from './GameInfo';
import './Board.scss';
import { HelpText } from './HelpText';

export const BoardContext = createContext({} as BoardProps<GameState>);
export const useBoardContext = () => useContext(BoardContext);

export const Board = (boardProps: BoardProps<GameState>): JSX.Element => {
  return (
    <BoardContext.Provider value={boardProps}>
      <div className="board">
        <div className="board__info">
          <GameInfo />
        </div>
        <div className="board__game">
          <HelpText />
          <TheaterRow />
          <Hand type="self" />
        </div>
      </div>
    </BoardContext.Provider>
  );
};
