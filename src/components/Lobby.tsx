import { Local } from 'boardgame.io/multiplayer';
// import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { AirLandSea } from '../game';
import { Board } from './Board';
// import { SERVER_URL } from '../config/client';

const GameClient = Client({
  game: AirLandSea,
  board: Board,
  // multiplayer: SocketIO({ server: SERVER_URL }),
  multiplayer: Local(),
});

export const Lobby = (): JSX.Element => {
  return (
    <div>
      <GameClient playerID="0" />
      <GameClient playerID="1" />
    </div>
  );
};
