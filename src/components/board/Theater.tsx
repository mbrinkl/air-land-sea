import { Box, Flex } from '@chakra-ui/react';
import { theme } from 'config/theme';
import { Theater as GameTheater } from 'game/gameTypes';
import { useBoardContext } from './Board';
import { Card } from './Card';

interface Props {
  theater: GameTheater;
}

export const Theater = ({ theater }: Props): JSX.Element => {
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
    <Box width="25%">
      <Flex backgroundColor="gray" height="150px">
        {deployedCards[(Number(playerID) ^ 1).toString()].map((card) => (
          <Card info={card} deployed="opponent" />
        ))}
      </Flex>
      <Box
        color="white"
        backgroundColor={theme[theaterName]}
        textAlign="center"
      >
        - {theaterName.toUpperCase()} -
      </Box>
      <Flex
        backgroundColor="gray"
        height="150px"
        _hover={{ bg: 'gainsboro' }}
        onClick={() => moves.deploy(getTheaterId())}
        onContextMenu={onRightClick}
      >
        {deployedCards[playerID!].map((card) => (
          <Card info={card} deployed="self" />
        ))}
      </Flex>
    </Box>
  );
};
