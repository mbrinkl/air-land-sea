import { Flex } from '@chakra-ui/react';
import { useBoardContext } from '../../hooks/useBoardContext';
import Card from './Card';
import CardIcon from './CardIcon';

interface Props {
  type: 'self' | 'opponent';
}

const Hand = ({ type }: Props) => {
  const { G, playerID } = useBoardContext();

  if (type === 'self') {
    return (
      <Flex alignItems="center" justifyContent="center" gap="5px">
        {G.players[playerID!].cards.map((card) => (
          <Card key={card.cardID} card={card} />
        ))}
      </Flex>
    );
  }

  return (
    <Flex gap="3px">
      {G.players[(Number(playerID) ^ 1).toString()].cards.map((card) => (
        <CardIcon key={card.cardID} />
      ))}
    </Flex>
  );
};

export default Hand;
