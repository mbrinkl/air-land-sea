import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { colors } from '../../theme';
import { Theater as GameTheater } from '../../game/gameTypes';
import { useBoardContext } from '../../hooks/useBoardContext';
import Card from './Card';

const TheaterOverlayControls = ({
  theaterID,
  canPlayFaceUp,
}: {
  theaterID: number;
  canPlayFaceUp: boolean;
}): JSX.Element => {
  const { moves } = useBoardContext();

  const onUpClick = () => {
    moves.deploy(theaterID);
  };

  const onDownClick = () => {
    moves.improvise(theaterID);
  };

  return (
    <Flex
      position="absolute"
      w="100%"
      h="100%"
      zIndex={50}
      bg="rgba(128,128,128,0.75)"
      alignItems="center"
      justifyContent="center"
      gap="10px"
    >
      {canPlayFaceUp && (
        <Button w="30%" onClick={onUpClick}>
          Up
        </Button>
      )}
      <Button w="30%" onClick={onDownClick}>
        Down
      </Button>
    </Flex>
  );
};

const Theater = ({ theater }: { theater: GameTheater }): JSX.Element => {
  const {
    theater: theaterName,
    deployedCards,
    totalStrength,
    isValid,
  } = theater;
  const { G, ctx, playerID, isActive } = useBoardContext();

  const getStrengthColor = (strength: number, opponentStrength: number) => {
    if (strength > opponentStrength) return 'green.500';
    if (strength < opponentStrength) return 'red.500';
    return undefined;
  };

  const theaterID = G.playingField.findIndex((t) => t.theater === theaterName);
  const strength = totalStrength[playerID!];
  const opponentStrength = totalStrength[Number(playerID) ^ 1];
  const isControlsOpen = isActive && ctx.activePlayers?.[playerID!] === 'place';

  return (
    <Box w="33%">
      <Flex pos="relative" h="150px" bg="gainsboro" alignItems="end">
        {deployedCards[(Number(playerID) ^ 1).toString()].map((card) => (
          <Card key={card.cardID} card={card} deployed="opponent" />
        ))}
        <Text
          as="b"
          pos="absolute"
          color={getStrengthColor(opponentStrength, strength)}
          top={0}
          left={0}
          right={0}
          textAlign="center"
        >
          {opponentStrength}
        </Text>
      </Flex>
      <Box color="white" bg={colors[theaterName]} textAlign="center">
        - {theaterName.toUpperCase()} -
      </Box>
      <Flex pos="relative" h="150px" bg="gainsboro">
        {deployedCards[playerID!].map((card) => (
          <Card key={card.cardID} card={card} deployed="self" />
        ))}
        <Text
          as="b"
          pos="absolute"
          color={getStrengthColor(strength, opponentStrength)}
          bottom={0}
          left={0}
          right={0}
          textAlign="center"
        >
          {strength}
        </Text>
        {isControlsOpen && (
          <TheaterOverlayControls
            theaterID={theaterID}
            canPlayFaceUp={isValid}
          />
        )}
      </Flex>
    </Box>
  );
};

export default Theater;
