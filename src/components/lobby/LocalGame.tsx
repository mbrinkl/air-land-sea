import { Box, StackDivider, VStack } from '@chakra-ui/react';
import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { AirLandSea } from '../../game';
import Board from '../board/Board';

const GameClient = Client({
  game: AirLandSea,
  board: Board,
  multiplayer: Local(),
});

const LocalGame = () => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray" />}
      spacing={4}
      align="stretch"
    >
      <Box w="100vw" h="100vh">
        <GameClient playerID="0" />
      </Box>
      {/* <Box w="100vw" h="100vh">
        <GameClient playerID="1" />
      </Box> */}
    </VStack>
  );
};

export default LocalGame;
