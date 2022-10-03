import { Local } from 'boardgame.io/multiplayer';
// import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { AirLandSea } from '../game';
import { Board } from './board/Board';
// import { SERVER_URL } from '../config/client';
import './Lobby.scss';

const GameClient = Client({
  game: AirLandSea,
  board: Board,
  // multiplayer: SocketIO({ server: SERVER_URL }),
  multiplayer: Local(),
});

export const Lobby = (): JSX.Element => {
  return (
    <div className="lobby">
      <GameClient playerID="0" />
      <div>
        <h1>--------------------------------------</h1>
      </div>
      <GameClient playerID="1" />
    </div>
  );
};
