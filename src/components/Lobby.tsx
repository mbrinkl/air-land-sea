import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { AirLandSea } from '../game';
import { Board } from './Board';
import { SERVER_URL } from '../config/client';
import { useParams } from 'react-router-dom';

const GameClient = Client({
  game: AirLandSea,
  board: Board,
  multiplayer: SocketIO({ server: SERVER_URL }),
});

export const Lobby = (): JSX.Element => {
  const { matchID } = useParams<{ matchID: string }>();
  return <GameClient matchID={matchID} />;
};
