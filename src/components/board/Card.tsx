import { Flex, Text } from '@chakra-ui/react';
import { colors } from '../../theme';
import { Card as GameCard } from '../../game/cards';
import { css } from '@emotion/react';
import { useBoardStore } from '../../hooks/useBoardStore';
import { useBoardContext } from '../../hooks/useBoardContext';

interface Props {
  card: GameCard;
  deployed?: 'self' | 'opponent';
}

const Card = ({ card, deployed }: Props) => {
  const setHoveredCardInfo = useBoardStore((s) => s.setHoveredCardInfo);

  const { G, moves, playerID } = useBoardContext();
  const { cardInfo, strength, faceDown } = card;
  const { name, desc, theater } = cardInfo;

  const getCardId = () =>
    G.players[playerID!].cards.findIndex((c) => c.cardID === card.cardID);

  const description =
    (deployed === 'opponent' && faceDown) || desc.length === 0
      ? ''
      : `${name} (${strength}): ${desc}`;

  return (
    <Flex
      pos="relative"
      w="75px"
      h="125px"
      bg={faceDown ? colors['faceDown'] : colors[theater]}
      border="2px solid black"
      color="white"
      align="center"
      justify="center"
      borderRadius="10%"
      cursor="pointer"
      marginRight={deployed != null ? '-50px' : '0'}
      onClick={!deployed ? () => moves.selectCard(getCardId()) : undefined}
      tabIndex={0}
      css={css`
        transition-duration: 0.3s;
        transition-property: transform;
        ${G.selectedCardID === getCardId()
          ? 'scale: 1.1'
          : `&:hover {
          transform: scale(1.1);
        }`}
      `}
      onMouseOver={() => setHoveredCardInfo(description)}
      onMouseOut={() => setHoveredCardInfo('')}
    >
      <Text pos="absolute" top={0} left={1}>
        {strength}
      </Text>
      {!faceDown && (
        <Text textAlign="center" wordBreak="break-word">
          {name}
        </Text>
      )}
    </Flex>
  );
};

export default Card;
