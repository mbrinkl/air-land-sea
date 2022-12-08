import { useBoardContext } from './Board';
import Card from './Card';
import CardIcon from './CardIcon';

interface Props {
  type: 'self' | 'opponent';
}

const Hand = ({ type }: Props) => {
  const { G, playerID } = useBoardContext();

  if (type === 'self') {
    return (
      <>
        {G.players[playerID!].cards.map((card) => (
          <Card key={card.cardID} card={card} />
        ))}
      </>
    );
  }

  return (
    <>
      {G.players[playerID!].cards.map((card) => (
        <CardIcon key={card.cardID} />
      ))}
    </>
  );
};

export default Hand;
