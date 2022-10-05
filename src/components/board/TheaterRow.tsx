import { useBoardContext } from './Board';
import { Theater } from './Theater';
import './TheaterRow.scss';

export const TheaterRow = () => {
  const { G } = useBoardContext();

  return (
    <div className="theater-row">
      {G.theaters.map((theater) => (
        <Theater theaterName={theater} />
      ))}
    </div>
  );
};
