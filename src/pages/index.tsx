import { Box, StackDivider, VStack } from '@chakra-ui/react';
import { Local } from 'boardgame.io/multiplayer';
// import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { AirLandSea } from '../game';
import Board from '../components/board/Board';
// import { SERVER_URL } from '../config/client';

const GameClient = Client({
  game: AirLandSea,
  board: Board,
  // multiplayer: SocketIO({ server: SERVER_URL }),
  multiplayer: Local(),
});

const Lobby = (): JSX.Element => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray" />}
      spacing={4}
      align="stretch"
    >
      <Box w="100vw" h="100vh" padding="10px">
        <GameClient playerID="0" />
      </Box>
      <Box w="100vw" h="100vh" padding="10px">
        <GameClient playerID="1" />
      </Box>
    </VStack>
  );
};

export default Lobby;
