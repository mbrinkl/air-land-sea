import { useBoardContext } from './Board';

export const GameInfo = (): JSX.Element => {
  const { G, playerID, moves, isActive } = useBoardContext();
  const playerTurnOrder = G.players.find((p) => p.ID === playerID)?.firstPlayer
    ? '1st'
    : '2nd';

  return (
    <>
      <h6>Baddie score: 0</h6>

      <button onClick={() => moves.resign()} disabled={!isActive}>
        Resign
      </button>

      <h5>You are the {playerTurnOrder} player</h5>
      <h5>Your turn: {isActive ? 'YES' : 'NO'}</h5>
      <h5>Scoring info?</h5>

      <h6>My Score: 0</h6>
    </>
  );
};
