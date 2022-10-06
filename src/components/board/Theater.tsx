import classNames from 'classnames';
import { Theater as GameTheater } from 'game';
import { useBoardContext } from './Board';
import { Card } from './Card';
import './Theater.scss';

interface Props {
  theater: GameTheater;
}

export const Theater = ({ theater }: Props): JSX.Element => {
  const { theater: theaterName, deployedCards } = theater;
  const { G, moves, playerID } = useBoardContext();

  function getTheaterId(): number {
    return G.playingField.findIndex((t) => t.theater === theaterName);
  }

  // todo: better way to play card face down
  function onRightClick(e: any) {
    e.preventDefault();
    moves.improvise(getTheaterId());
    return false;
  }

  return (
    <div className="theater-column">
      <div
        className={classNames(
          'theater-column__cards',
          'theater-column__cards--opponent',
        )}
      >
        {deployedCards[(Number(playerID) ^ 1).toString()].map((card) => (
          <Card info={card} deployed="opponent" />
        ))}
      </div>
      <div
        className={classNames(
          'theater-column__center',
          `theater-column__center--${theaterName}`,
        )}
      >
        - {theaterName.toUpperCase()} -
      </div>
      <div
        className={classNames(
          'theater-column__cards',
          'theater-column__cards--self',
        )}
        onClick={() => moves.deploy(getTheaterId())}
        onContextMenu={onRightClick}
      >
        {deployedCards[Number(playerID).toString()].map((card) => (
          <Card info={card} deployed="self" />
        ))}
      </div>
    </div>
  );
};
