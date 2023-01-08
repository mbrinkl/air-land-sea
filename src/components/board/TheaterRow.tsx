import { Flex } from '@chakra-ui/react';
import { useBoardContext } from '../../hooks/useBoardContext';
import Theater from './Theater';

const TheaterRow = () => {
  const { G } = useBoardContext();

  return (
    <Flex align="center" justify="center">
      {G.playingField.map((theater) => (
        <Theater key={theater.theater} theater={theater} />
      ))}
    </Flex>
  );
};

export default TheaterRow;
