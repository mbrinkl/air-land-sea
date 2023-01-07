import { CardInfo, cardInfoRecords } from './cardInfo';

export type TheaterType = 'air' | 'land' | 'sea';
export type AbilityType = 'ongoing' | 'instant' | 'none';
export type OngoingType = 'global' | 'player';

export interface Card {
  cardID: string;
  cardInfo: CardInfo;
  strength: number;
  covered: boolean;
  faceDown: boolean;
}

const genericCard: Card = {
  cardID: 'Generic Card',
  cardInfo: {
    name: 'None',
    desc: 'None',
    strength: -1,
    theater: 'air',
    type: 'none',
  },
  strength: -1,
  covered: false,
  faceDown: false,
};

export const battleCards: Card[] = Object.keys(cardInfoRecords).map(
  (cardID) => {
    const cardInfo = cardInfoRecords[cardID];
    return {
      ...genericCard,
      cardID,
      cardInfo,
      strength: cardInfo.strength,
    };
  },
);
