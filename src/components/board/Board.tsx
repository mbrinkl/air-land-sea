import { useContext, createContext } from 'react';
import { BoardProps } from 'boardgame.io/react';
import { GameState } from '../../game/gameTypes';
import Hand from './Hand';
import TheaterRow from './TheaterRow';
import { Box, VStack, Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import Controls from './Controls';
import HelpText from './HelpText';
import { useAppSelector } from 'hooks';

export const BoardContext = createContext({} as BoardProps<GameState>);
export const useBoardContext = () => useContext(BoardContext);

const Board = (boardProps: BoardProps<GameState>): JSX.Element => {
  const hoveredCardInfo = useAppSelector(
    (state) => state.board.hoveredCardInfo,
  );

  return (
    <BoardContext.Provider value={boardProps}>
      <VStack h="100vh">
        <Flex h="10%" gap="3px" alignItems="center">
          <Hand type="opponent" />
        </Flex>
        <Box h="60%" w="100%">
          <TheaterRow />
        </Box>
        <Grid h="30%" w="100%" templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem h="100%">
            <Flex
              h="100%"
              alignItems="center"
              justifyContent="center"
              gap="3px"
            >
              <Controls />
            </Flex>
          </GridItem>
          <GridItem colSpan={2} h="100%">
            <HelpText />
            <Flex alignItems="center" justifyContent="center" gap="5px">
              <Hand type="self" />
            </Flex>
          </GridItem>
          <GridItem h="100%">
            <Flex h="100%" alignItems="center">
              <Text>{hoveredCardInfo}</Text>
            </Flex>
          </GridItem>
        </Grid>
      </VStack>
    </BoardContext.Provider>
  );
};

export default Board;
