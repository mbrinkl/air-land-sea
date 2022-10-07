import { StackDivider, VStack } from '@chakra-ui/react';
import { Local } from 'boardgame.io/multiplayer';
// import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { AirLandSea } from '../game';
import Board from './board/Board';
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
      <GameClient playerID="0" />
      <GameClient playerID="1" />
    </VStack>
  );
};

export default Lobby;
