import { Text, Stack } from '@chakra-ui/react';
import { colors } from '../../config/theme';
import { useBoardContext } from './Board';

const SupremeCommanderCard = ({
  playerID,
}: {
  playerID: string;
}): JSX.Element => {
  const { G, playerID: clientPlayerID } = useBoardContext();
  const player = G.players.find((p) => p.ID === playerID);
  const color = player?.firstPlayer ? colors['first'] : colors['second'];

  return (
    <Stack
      w="75px"
      h="125px"
      bg="gainsboro"
      border={`2px solid ${color}`}
      borderRadius="10%"
      textAlign="center"
    >
      <Text color={color} size="md">
        {player?.firstPlayer ? '1st' : '2nd'}
      </Text>
      <Text size="md">
        Player {playerID}
        {playerID === clientPlayerID && ' (You)'}
      </Text>
      <Text size="md">Score: {player?.score}</Text>
    </Stack>
  );
};

export default SupremeCommanderCard;
