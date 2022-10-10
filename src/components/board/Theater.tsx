import { Box, Flex } from '@chakra-ui/react';
import { theme } from 'config/theme';
import { Theater as GameTheater } from 'game/gameTypes';
import { useBoardContext } from './Board';
import Card from './Card';

interface Props {
  theater: GameTheater;
  setDesc?: (desc: string) => void;
}

const Theater = ({ theater, setDesc }: Props): JSX.Element => {
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
      <Flex height="150px" alignItems="center">
        {deployedCards[(Number(playerID) ^ 1).toString()].map((card) => (
          <Card
            key={card.cardID}
            card={card}
            deployed="opponent"
            setDesc={setDesc}
          />
        ))}
      </Flex>
      <Box color="white" bg={theme[theaterName]} textAlign="center">
        - {theaterName.toUpperCase()} -
      </Box>
      <Flex
        height="150px"
        alignItems="center"
        _hover={{ bg: 'gainsboro' }}
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
      </Flex>
    </Box>
  );
};

export default Theater;
