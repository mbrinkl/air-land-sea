import { CardInfo } from '../../game/cards';
import { useBoardContext } from './Board';
import Card from './Card';
import CardIcon from './CardIcon';

interface Props {
  type: 'self' | 'opponent';
}

const Hand = ({ type }: Props) => {
  const { G, playerID } = useBoardContext();

  let hand: CardInfo[] = [];

  if (type === 'self') {
    hand = G.players.find((p) => p.ID === playerID)!.cards;

    return (
      <>
        {hand.map((card) => (
          <Card key={`${card.theater}${card.name}`} info={card} />
        ))}
      </>
    );
  }

  hand = G.players.find((p) => p.ID !== playerID)!.cards;

  return (
    <>
      {G.players
        .find((p) => p.ID !== playerID)
        ?.cards.map((card) => (
          <CardIcon key={`${card.theater}${card.name}`} />
        ))}
    </>
  );
};

export default Hand;
