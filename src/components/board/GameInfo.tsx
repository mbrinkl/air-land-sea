import { useBoardContext } from './Board';

export const GameInfo = (): JSX.Element => {
  const { G, playerID, moves, isActive } = useBoardContext();
  const self = G.players.find((p) => p.ID === playerID);
  const opponent = G.players.find((p) => p.ID !== playerID);
  const playerTurnOrder = self?.firstPlayer ? '1st' : '2nd';

  return (
    <>
      <h6>Baddie score: {opponent?.score}</h6>

      <button onClick={() => moves.resign()} disabled={!isActive}>
        Resign
      </button>

      <h5>You are the {playerTurnOrder} player</h5>
      <h5>Your turn: {isActive ? 'YES' : 'NO'}</h5>
      <h5>Scoring info?</h5>

      <h6>My Score: {self?.score}</h6>
    </>
  );
};
