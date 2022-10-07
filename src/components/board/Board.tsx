import { useContext, createContext } from 'react';
import { BoardProps } from 'boardgame.io/react';
import { GameState } from '../../game/gameTypes';
import { Hand } from './Hand';
import { TheaterRow } from './TheaterRow';
import { GameInfo } from './GameInfo';
import { PlayerSide } from './PlayerSide';
import { Flex } from '@chakra-ui/react';

export const BoardContext = createContext({} as BoardProps<GameState>);
export const useBoardContext = () => useContext(BoardContext);

export const Board = (boardProps: BoardProps<GameState>): JSX.Element => {
  return (
    <BoardContext.Provider value={boardProps}>
      <Flex>
        <GameInfo />
        <div className="board__game">
          <PlayerSide
            sidePlayerID={(Number(boardProps.playerID) ^ 1).toString()}
          >
            <Hand type="opponent" />
          </PlayerSide>
          <TheaterRow />
          <PlayerSide sidePlayerID={boardProps.playerID!}>
            <Hand type="self" />
          </PlayerSide>
        </div>
      </Flex>
    </BoardContext.Provider>
  );
};
