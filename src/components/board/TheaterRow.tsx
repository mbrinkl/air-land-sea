import { Flex, Text, Stack } from '@chakra-ui/react';
import { useBoardContext } from './Board';
import SupremeCommanderCard from './SupremeCommanderCard';
import Theater from './Theater';

const TheaterRow = () => {
  const { G, playerID } = useBoardContext();

  return (
    <Flex alignItems="center" justifyContent="center">
      <Flex h="300px" alignItems="flex-end" marginRight="10px">
        <SupremeCommanderCard playerID={playerID!} />
      </Flex>
      {G.playingField.map((theater) => (
        <Theater key={theater.theater} theater={theater} />
      ))}
      <Flex h="300px" alignItems="flex-start" marginLeft="10px">
        <SupremeCommanderCard playerID={(Number(playerID) ^ 1).toString()} />
      </Flex>
    </Flex>
  );
};

export default TheaterRow;
