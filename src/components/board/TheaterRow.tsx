import { Theater } from './Theater';
import './TheaterRow.scss';

export const TheaterRow = () => {
  // Get theater order from gamestate
  return (
    <div className="theater-row">
      <Theater theaterName="Air" />
      <Theater theaterName="Land" />
      <Theater theaterName="Sea" />
    </div>
  );
};
