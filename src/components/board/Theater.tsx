import classNames from 'classnames';
import { battleCards } from 'game/cards';
import { useBoardContext } from './Board';
import { Card } from './Card';
import './Theater.scss';

interface Props {
  theaterName: string;
}

export const Theater = ({ theaterName }: Props): JSX.Element => {
  const { moves } = useBoardContext();

  const demoCards = [battleCards[0], battleCards[1]];

  return (
    <div className="theater-column">
      <div
        className={classNames(
          'theater-column__cards',
          'theater-column__cards--opponent',
        )}
      >
        <Card info={demoCards[0]} facedown={false} type="opponent-theater" />
        <Card info={demoCards[1]} facedown={false} type="opponent-theater" />
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
        onClick={() => moves.placeCardFaceUp()}
      >
        <Card info={demoCards[0]} facedown={false} type="self-theater" />
        <Card info={demoCards[1]} facedown={false} type="self-theater" />
      </div>
    </div>
  );
};
