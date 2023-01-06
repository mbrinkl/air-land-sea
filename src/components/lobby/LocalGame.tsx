import { Container, StackDivider, VStack } from '@chakra-ui/react';
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
      <Container h="100vh" maxW="container.lg">
        <GameClient playerID="0" />
      </Container>
      <Container h="100vh" maxW="container.lg">
        <GameClient playerID="1" />
      </Container>
    </VStack>
  );
};

export default LocalGame;
