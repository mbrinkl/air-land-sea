import { useBoardContext } from './Board';
import Card from './Card';
import CardIcon from './CardIcon';

interface Props {
  type: 'self' | 'opponent';
  setDesc?: (desc: string) => void;
}

const Hand = ({ type, setDesc }: Props) => {
  const { G, playerID } = useBoardContext();

  if (type === 'self') {
    return (
      <>
        {G.players
          .find((p) => p.ID === playerID)
          ?.cards.map((card) => (
            <Card key={card.cardID} card={card} setDesc={setDesc} />
          ))}
      </>
    );
  }

  return (
    <>
      {G.players
        .find((p) => p.ID !== playerID)
        ?.cards.map((card) => (
          <CardIcon key={card.cardID} />
        ))}
    </>
  );
};

export default Hand;
