import { Flex, Box } from '@chakra-ui/react';
import { useBoardContext } from './Board';
import Theater from './Theater';

const TheaterRow = () => {
  const { G } = useBoardContext();

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box w="75px" h="125px">
        p0: info
      </Box>
      {G.playingField.map((theater) => (
        <Theater key={theater.theater} theater={theater} />
      ))}
      <Box w="75px" h="125px">
        p1: info
      </Box>
    </Flex>
  );
};

export default TheaterRow;
