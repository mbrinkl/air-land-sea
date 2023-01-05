import { Box, Flex, Text } from '@chakra-ui/react';
import { colors } from '../../theme';
import { Theater as GameTheater } from '../../game/gameTypes';
import { useBoardContext } from './Board';
import Card from './Card';

interface Props {
  theater: GameTheater;
}

const Theater = ({ theater }: Props): JSX.Element => {
  const { theater: theaterName, deployedCards, totalStrength } = theater;
  const { G, moves, playerID } = useBoardContext();

  function getTheaterId(): number {
    return G.playingField.findIndex((t) => t.theater === theaterName);
  }

  // todo: better way to play card face down
  function onRightClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    moves.improvise(getTheaterId());
    return false;
  }

  const getStrengthColor = (strength: number, opponentStrength: number) => {
    if (strength > opponentStrength) return 'green.500';
    if (strength < opponentStrength) return 'red.500';
    return undefined;
  };

  const strength = totalStrength[playerID!];
  const opponentStrength = totalStrength[Number(playerID) ^ 1];

  return (
    <Box w="33%">
      <Flex pos="relative" h="150px" bg="gainsboro" alignItems="end">
        {deployedCards[(Number(playerID) ^ 1).toString()].map((card) => (
          <Card key={card.cardID} card={card} deployed="opponent" />
        ))}
        <Text
          as="b"
          pos="absolute"
          color={getStrengthColor(opponentStrength, strength)}
          top={0}
          left={0}
          right={0}
          textAlign="center"
        >
          {opponentStrength}
        </Text>
      </Flex>
      <Box color="white" bg={colors[theaterName]} textAlign="center">
        - {theaterName.toUpperCase()} -
      </Box>
      <Flex
        pos="relative"
        h="150px"
        bg="gainsboro"
        _hover={{ bg: 'silver' }}
        cursor="pointer"
        onClick={() => moves.deploy(getTheaterId())}
        onContextMenu={onRightClick}
      >
        {deployedCards[playerID!].map((card) => (
          <Card key={card.cardID} card={card} deployed="self" />
        ))}
        <Text
          as="b"
          pos="absolute"
          color={getStrengthColor(strength, opponentStrength)}
          bottom={0}
          left={0}
          right={0}
          textAlign="center"
        >
          {strength}
        </Text>
      </Flex>
    </Box>
  );
};

export default Theater;
