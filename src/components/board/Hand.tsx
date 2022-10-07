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
        {G.players
          .find((p) => p.ID === playerID)
          ?.cards.map((card) => (
            <Card card={card} />
          ))}
      </>
    );
  }

  return (
    <>
      {G.players
        .find((p) => p.ID !== playerID)
        ?.cards.map(() => (
          <CardIcon />
        ))}
    </>
  );
};

export default Hand;
