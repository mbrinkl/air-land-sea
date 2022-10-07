import { Box, Flex } from '@chakra-ui/react';
import { theme } from 'config/theme';
import { Theater as GameTheater } from 'game/gameTypes';
import { useBoardContext } from './Board';
import Card from './Card';

interface Props {
  theater: GameTheater;
}

const Theater = ({ theater }: Props): JSX.Element => {
  const { theater: theaterName, deployedCards } = theater;
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
      <Flex bg="gray" height="150px" alignItems="center">
        {deployedCards[(Number(playerID) ^ 1).toString()].map((card) => (
          <Card
            key={`${card.theater}${card.name}`}
            info={card}
            deployed="opponent"
          />
        ))}
      </Flex>
      <Box color="white" bg={theme[theaterName]} textAlign="center">
        - {theaterName.toUpperCase()} -
      </Box>
      <Flex
        bg="gray"
        height="150px"
        alignItems="center"
        _hover={{ bg: 'gainsboro' }}
        onClick={() => moves.deploy(getTheaterId())}
        onContextMenu={onRightClick}
      >
        {deployedCards[playerID!].map((card) => (
          <Card
            key={`${card.theater}${card.name}`}
            info={card}
            deployed="self"
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Theater;
