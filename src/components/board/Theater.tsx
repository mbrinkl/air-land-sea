import { Box, Flex, Text } from '@chakra-ui/react';
import { theme } from 'config/theme';
import { Theater as GameTheater } from 'game/gameTypes';
import { useBoardContext } from './Board';
import Card from './Card';

interface Props {
  theater: GameTheater;
  setDesc?: (desc: string) => void;
}

const Theater = ({ theater, setDesc }: Props): JSX.Element => {
  const { theater: theaterName, deployedCards, totalStrength } = theater;
  const { G, moves, playerID } = useBoardContext();

  function getTheaterId(): number {
    return G.playingField.findIndex((t) => t.theater === theaterName);
  }

  // todo: better way to play card face down
  function onRightClick(e: any) {
    e.preventDefault();
    moves.improvise(getTheaterId());
    return false;
  }

  return (
    <Box w="25%">
      <Flex pos="relative" height="150px" alignItems="end">
        {deployedCards[(Number(playerID) ^ 1).toString()].map((card) => (
          <Card
            key={card.cardID}
            card={card}
            deployed="opponent"
            setDesc={setDesc}
          />
        ))}
        <Text pos="absolute" top={0} left={0} right={0} textAlign="center">
          {totalStrength[Number(playerID) ^ 1]}
        </Text>
      </Flex>
      <Box color="white" bg={theme[theaterName]} textAlign="center">
        - {theaterName.toUpperCase()} -
      </Box>
      <Flex
        pos="relative"
        height="150px"
        _hover={{ bg: 'gainsboro' }}
        cursor="pointer"
        onClick={() => moves.deploy(getTheaterId())}
        onContextMenu={onRightClick}
      >
        {deployedCards[playerID!].map((card) => (
          <Card
            key={card.cardID}
            card={card}
            deployed="self"
            setDesc={setDesc}
          />
        ))}
        <Text pos="absolute" bottom={0} left={0} right={0} textAlign="center">
          {totalStrength[playerID!]}
        </Text>
      </Flex>
    </Box>
  );
};

export default Theater;
