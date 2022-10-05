import { CardInfo } from '../../game/cards';
import { useBoardContext } from './Board';
import { Card } from './Card';
import './Hand.scss';

interface Props {
  type: 'self' | 'opponent';
}

export const Hand = ({ type }: Props) => {
  const { G, playerID } = useBoardContext();

  let hand: CardInfo[] = [];

  if (type === 'self') {
    hand = G.players.find((p) => p.ID === playerID)!.cards;
  } else {
    hand = G.players.find((p) => p.ID !== playerID)!.cards;
  }

  return (
    <div className="hand">
      {hand.map((card) => (
        <Card info={card} facedown={type === 'opponent'} type={type} />
      ))}
    </div>
  );
};
