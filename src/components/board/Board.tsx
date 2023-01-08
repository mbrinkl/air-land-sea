import { BoardProps } from 'boardgame.io/react';
import { Box, VStack, Flex } from '@chakra-ui/react';
import { GameState } from '../../game/gameTypes';
import { BoardContext } from '../../hooks/useBoardContext';
import Hand from './Hand';
import TheaterRow from './TheaterRow';
import Controls from './Controls';
import HelpText from './HelpText';
import PlayerInfo from './PlayerInfo';
import InvitePlayerButton from './InvitePlayerButton';

const Board = (boardProps: BoardProps<GameState>): JSX.Element => {
  const opponentID = (Number(boardProps.playerID) ^ 1).toString();
  const isLocalGame = boardProps.matchData![0].isConnected === undefined;
  const has2ndPlayerJoined = boardProps.matchData![1].isConnected !== undefined;

  return (
    <BoardContext.Provider value={boardProps}>
      <VStack h="100vh" py="10px">
        <Flex h="10%" w="100%" align="center" justify="space-between">
          {!isLocalGame && !has2ndPlayerJoined ? (
            <InvitePlayerButton />
          ) : (
            <PlayerInfo playerID={opponentID} />
          )}
          <Hand type="opponent" />
        </Flex>
        <Box h="50%" w="100%">
          <TheaterRow />
        </Box>
        <Flex h="40%" w="100%" direction="column" gap="10px" justify="flex-end">
          <Box px="10px">
            <PlayerInfo playerID={boardProps.playerID!} />
          </Box>
          <HelpText />
          <Hand type="self" />
          <Flex align="center" justify="center" gap="3px">
            <Controls />
          </Flex>
        </Flex>
      </VStack>
    </BoardContext.Provider>
  );
};

export default Board;
