import { BoardProps } from 'boardgame.io/react';
import { Box, VStack, Flex, Text } from '@chakra-ui/react';
import { GameState } from '../../game/gameTypes';
import { useBoardStore } from '../../hooks/useBoardStore';
import { BoardContext } from '../../hooks/useBoardContext';
import Hand from './Hand';
import TheaterRow from './TheaterRow';
import Controls from './Controls';
import HelpText from './HelpText';
import PlayerInfo from './PlayerInfo';
import InvitePlayerButton from './InvitePlayerButton';

const Board = (boardProps: BoardProps<GameState>): JSX.Element => {
  const hoveredCardInfo = useBoardStore((s) => s.hoveredCardInfo);
  const opponentID = (Number(boardProps.playerID) ^ 1).toString();
  const isLocalGame = boardProps.matchData![0].isConnected === undefined;
  const has2ndPlayerJoined = boardProps.matchData![1].isConnected !== undefined;

  return (
    <BoardContext.Provider value={boardProps}>
      <VStack h="100vh" py="10px">
        <Flex
          h="10%"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
        >
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
        <Flex
          h="40%"
          w="100%"
          direction="column"
          gap="10px"
          justifyContent="flex-end"
        >
          <Box px="10px">
            <PlayerInfo playerID={boardProps.playerID!} />
          </Box>
          <Box textAlign="center">
            <HelpText />
            <Text>
              {hoveredCardInfo.length > 0 ? hoveredCardInfo : '\u00A0'}
            </Text>
          </Box>
          <Hand type="self" />
          <Flex alignItems="center" justifyContent="center" gap="3px">
            <Controls />
          </Flex>
        </Flex>
      </VStack>
    </BoardContext.Provider>
  );
};

export default Board;
