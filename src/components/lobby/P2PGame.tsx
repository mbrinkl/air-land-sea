import { Box } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'react-router-dom';
import { P2P } from '@boardgame.io/p2p';
import { Client } from 'boardgame.io/react';
import { useStoredCredentials } from '../../hooks/useStoredCredentials';
import { AirLandSea } from '../../game';
import Board from '../board/Board';
import Loading from './Loading';

const P2PGame = (): JSX.Element => {
  const { matchID } = useParams<{ matchID: string }>();
  const [searchParams] = useSearchParams();
  const isHost = searchParams.get('host') !== null;
  const credentials = useStoredCredentials(matchID!);

  const P2PClient = Client({
    game: AirLandSea,
    board: Board,
    multiplayer: P2P({ isHost }),
    loading: Loading,
  });

  return (
    <Box w="100vw" h="100vh">
      <P2PClient
        matchID={matchID}
        playerID={isHost ? '0' : '1'}
        credentials={credentials}
      />
    </Box>
  );
};

export default P2PGame;
