import { Flex, Text } from '@chakra-ui/react';
import { colors } from '../../config/theme';
import { Card as GameCard } from '../../game/cards';
import { useBoardContext } from './Board';
import { css } from '@emotion/react';
import { setHoveredCardInfo } from '../../store/board';
import { useAppDispatch } from '../../hooks';

interface Props {
  card: GameCard;
  deployed?: 'self' | 'opponent';
}

const Card = ({ card, deployed }: Props) => {
  const dispatch = useAppDispatch();

  const { G, moves, playerID } = useBoardContext();
  const { cardInfo, strength, faceDown } = card;
  const { name, desc, theater } = cardInfo;

  function getCardId(): number {
    return G.players[Number(playerID)].cards.findIndex(
      (c) => c.cardID === card.cardID,
    );
  }

  const description =
    deployed === 'opponent' && faceDown ? '' : `${name} (${strength}): ${desc}`;

  return (
    <Flex
      pos="relative"
      w="75px"
      h="125px"
      bg={faceDown ? colors['faceDown'] : colors[theater]}
      border="2px solid black"
      color="white"
      alignItems="center"
      justifyContent="center"
      borderRadius="10%"
      cursor="pointer"
      marginRight={deployed != null ? '-50px' : '0'}
      onClick={!deployed ? () => moves.selectCard(getCardId()) : undefined}
      tabIndex={0}
      css={css`
        transition-duration: 0.3s;
        transition-property: transform;
        &:hover {
          transform: scale(1.1);
        }
      `}
      onMouseOver={() => dispatch(setHoveredCardInfo(description))}
      onMouseOut={() => dispatch(setHoveredCardInfo(''))}
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
