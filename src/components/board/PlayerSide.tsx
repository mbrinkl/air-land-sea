import { Flex } from '@chakra-ui/react';
import { useBoardContext } from './Board';

interface Props {
  sidePlayerID: string;
  children: React.ReactNode;
}

export const PlayerSide = ({ sidePlayerID, children }: Props): JSX.Element => {
  const { G, playerID } = useBoardContext();
  const player = G.players.find((p) => p.ID === sidePlayerID);

  return (
    <Flex justifyContent="space-between" paddingLeft="15%" paddingRight="15%">
      <p>
        player {sidePlayerID}
        {sidePlayerID === playerID && ' (You)'}, score: {player?.score}, order:{' '}
        {player?.firstPlayer ? '1st' : '2nd'}
      </p>
      <Flex gap="3px">{children}</Flex>
    </Flex>
  );
};
