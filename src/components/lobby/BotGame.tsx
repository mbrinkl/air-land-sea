import { Container } from '@chakra-ui/react';
import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { MCTSBot } from 'boardgame.io/ai';
import { AirLandSea } from '../../game';
import Board from '../board/Board';

const BotGame = () => {
  const BotClient = Client({
    game: AirLandSea,
    board: Board,
    multiplayer: Local({
      bots: {
        1: MCTSBot,
      },
    }),
  });

  return (
    <Container h="100vh" maxW="container.lg">
      <BotClient playerID="0" />
    </Container>
  );
};

export default BotGame;
