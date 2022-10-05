import { useBoardContext } from './Board';
import { CardIcon } from './CardIcon';
import './GameInfo.scss';

export const GameInfo = (): JSX.Element => {
  const { G, playerID, moves, isActive } = useBoardContext();
  const self = G.players.find((p) => p.ID === playerID);
  const opponent = G.players.find((p) => p.ID !== playerID);
  const playerTurnOrder = self?.firstPlayer ? '1st' : '2nd';

  return (
    <div className="game-info">
      <div className="game-info__opponent">
        <h6>Baddie score: {opponent?.score}</h6>
        <div className="game-info__opponent-cards">
          {opponent?.cards.map(() => (
            <CardIcon />
          ))}
        </div>
      </div>

      <div className="game-info__self">
        <button onClick={() => moves.resign()} disabled={!isActive}>
          Resign
        </button>

        <h5>You are the {playerTurnOrder} player</h5>
        <h5>Scoring info?</h5>

        <h6>My Score: {self?.score}</h6>
      </div>
    </div>
  );
};
