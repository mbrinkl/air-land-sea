import classNames from 'classnames';
import { battleCards } from 'game/cards';
import { Card } from './Card';
import './Theater.scss';

interface Props {
  theaterName: string;
}

export const Theater = ({ theaterName }: Props): JSX.Element => {
  const demoCard = battleCards[0];

  return (
    <div className="theater-column">
      <div className="theater-column__cards">
        <Card info={demoCard} facedown={false} />
      </div>
      <div
        className={classNames(
          'theater-column__center',
          `theater-column__center--${theaterName}`,
        )}
      >
        {theaterName}
      </div>
      <div className="theater-column__cards">
        <Card info={demoCard} facedown={true} />
      </div>
    </div>
  );
};
