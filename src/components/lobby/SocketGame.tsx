import { Box } from '@chakra-ui/react';
// import { Local } from 'boardgame.io/multiplayer';
import { useParams } from 'react-router-dom';
import { SocketIO } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import { AirLandSea } from '../../game';
import Board from '../board/Board';
import { SERVER_URL } from '../../config/client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { joinMatchThunk } from '../../store/user';
import { LobbyAPI } from 'boardgame.io';
import { getMatch } from '../../api';

const GameClient = Client({
  game: AirLandSea,
  board: Board,
  multiplayer: SocketIO({ server: SERVER_URL }),
});

const Game = (): JSX.Element => {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return <JoinGame startGame={() => setGameStarted(true)}></JoinGame>;
  }

  return <SocketGame />;
};

const SocketGame = (): JSX.Element => {
  const { matchID } = useParams<{ matchID: string }>();
  const roomData = useAppSelector((state) => state.user.roomData);

  if (!matchID || !roomData) {
    return <h1>Error loading game</h1>;
  }

  return (
    <Box w="100vw" h="100vh">
      <GameClient
        matchID={matchID}
        playerID={roomData.playerID}
        credentials={roomData.credentials}
      />
    </Box>
  );
};

const JoinGame = ({ startGame }: { startGame: () => void }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { matchID } = useParams<{ matchID: string }>();
  const roomData = useAppSelector((state) => state.user.roomData);
  const nickname = useAppSelector((state) => state.user.nickname);
  const [matchMetadata, setMatchMetadata] = useState<LobbyAPI.Match>();

  const gameRoomFull =
    matchMetadata?.players.filter((p) => !p.name).length === 0;

  // poll api to load match data
  useEffect(() => {
    function pollMatch() {
      if (matchID) {
        getMatch(matchID).then((match) => {
          if (match) {
            setMatchMetadata(match);
          }
        });
      }
    }

    pollMatch();
    const intervalID = setInterval(() => {
      pollMatch();
    }, 500);

    return () => clearInterval(intervalID);
  }, [matchID]);

  useEffect(() => {
    if (matchID && !(roomData?.matchID === matchID) && !gameRoomFull) {
      dispatch(
        joinMatchThunk({
          matchID: matchID,
          playerName: nickname ?? 'noob',
        }),
      );
    }
  }, [matchID, nickname, roomData?.matchID, gameRoomFull, dispatch]);

  useEffect(() => {
    if (gameRoomFull) {
      setTimeout(() => startGame(), 2000);
    }
  }, [gameRoomFull, startGame]);

  if (roomData === null) {
    return <h1>room data not found</h1>;
  }

  return <h2>waiting for a buddy</h2>;
};

export default Game;
