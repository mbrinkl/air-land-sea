import { useContext, createContext } from 'react';
import { BoardProps } from 'boardgame.io/react';
import { GameState } from '../../game/gameTypes';
import { Hand } from './Hand';
import { TheaterRow } from './TheaterRow';
import { GameInfo } from './GameInfo';
import { PlayerSide } from './PlayerSide';
import { Box, HStack } from '@chakra-ui/react';

export const BoardContext = createContext({} as BoardProps<GameState>);
export const useBoardContext = () => useContext(BoardContext);

export const Board = (boardProps: BoardProps<GameState>): JSX.Element => {
  return (
    <BoardContext.Provider value={boardProps}>
      <HStack>
        <Box w="20%">
          <GameInfo />
        </Box>
        <Box w="80%">
          <PlayerSide
            sidePlayerID={(Number(boardProps.playerID) ^ 1).toString()}
          >
            <Hand type="opponent" />
          </PlayerSide>
          <TheaterRow />
          <PlayerSide sidePlayerID={boardProps.playerID!}>
            <Hand type="self" />
          </PlayerSide>
        </Box>
      </HStack>
    </BoardContext.Provider>
  );
};
