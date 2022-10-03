import { battleCards } from 'game/cards';
import { Card } from './Card';
import './Hand.scss';

interface Props {
  handOfPlayer: string | null;
}

export const Hand = ({ handOfPlayer }: Props) => {
  // GameState hand
  const hand = battleCards.slice(0, 6);

  return (
    <div className="hand">
      {hand.map((card) => (
        <Card info={card} facedown={false} />
      ))}
    </div>
  );
};
