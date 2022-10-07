import { Flex } from '@chakra-ui/react';
import { useBoardContext } from './Board';
import { Theater } from './Theater';

export const TheaterRow = () => {
  const { G } = useBoardContext();

  return (
    <Flex alignItems="center" justifyContent="center">
      {G.playingField.map((theater) => (
        <Theater theater={theater} />
      ))}
    </Flex>
  );
};
