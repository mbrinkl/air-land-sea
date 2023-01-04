import { Text, Flex } from '@chakra-ui/react';
import { colors } from '../../config/theme';
import { useBoardContext } from './Board';

const PlayerInfo = ({ playerID }: { playerID: string }): JSX.Element => {
  const { G, playerID: clientPlayerID } = useBoardContext();
  const player = G.players[playerID];
  const color = player?.firstPlayer ? colors['first'] : colors['second'];

  return (
    <Flex color={color} gap="5px">
      <Text as="b" size="md">
        Player {playerID}
        {playerID === clientPlayerID && ' (You)'},
      </Text>
      <Text as="b" size="md">
        {player?.firstPlayer ? '1st' : '2nd'},
      </Text>
      <Text as="b" size="md">
        Score: {player?.score}
      </Text>
    </Flex>
  );
};

export default PlayerInfo;
