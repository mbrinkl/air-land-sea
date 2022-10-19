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

export const battleCards: Card[] = [
  {
    ...genericCard,
    cardID: 'Support',
    cardInfo: cardInfoRecords.Support,
    strength: cardInfoRecords.Support.strength,
  },
  {
    ...genericCard,
    cardID: 'Air_Drop',
    cardInfo: cardInfoRecords.Air_Drop,
    strength: cardInfoRecords.Air_Drop.strength,
  },
  {
    ...genericCard,
    cardID: 'Maneuver_Air',
    cardInfo: cardInfoRecords.Maneuver_Air,
    strength: cardInfoRecords.Maneuver_Air.strength,
  },
  {
    ...genericCard,
    cardID: 'Aerodrome',
    cardInfo: cardInfoRecords.Aerodrome,
    strength: cardInfoRecords.Aerodrome.strength,
  },
  {
    ...genericCard,
    cardID: 'Containment',
    cardInfo: cardInfoRecords.Containment,
    strength: cardInfoRecords.Containment.strength,
  },
  {
    ...genericCard,
    cardID: 'Heavy_Bombers',
    cardInfo: cardInfoRecords.Heavy_Bombers,
    strength: cardInfoRecords.Heavy_Bombers.strength,
  },
  {
    ...genericCard,
    cardID: 'Reinforce',
    cardInfo: cardInfoRecords.Reinforce,
    strength: cardInfoRecords.Reinforce.strength,
  },
  {
    ...genericCard,
    cardID: 'Ambush',
    cardInfo: cardInfoRecords.Ambush,
    strength: cardInfoRecords.Ambush.strength,
  },
  {
    ...genericCard,
    cardID: 'Maneuver_Land',
    cardInfo: cardInfoRecords.Maneuver_Land,
    strength: cardInfoRecords.Maneuver_Land.strength,
  },
  {
    ...genericCard,
    cardID: 'Cover_Fire',
    cardInfo: cardInfoRecords.Cover_Fire,
    strength: cardInfoRecords.Cover_Fire.strength,
  },
  {
    ...genericCard,
    cardID: 'Disrupt',
    cardInfo: cardInfoRecords.Disrupt,
    strength: cardInfoRecords.Disrupt.strength,
  },
  {
    ...genericCard,
    cardID: 'Heavy_Tanks',
    cardInfo: cardInfoRecords.Heavy_Tanks,
    strength: cardInfoRecords.Heavy_Tanks.strength,
  },
  {
    ...genericCard,
    cardID: 'Transport',
    cardInfo: cardInfoRecords.Transport,
    strength: cardInfoRecords.Transport.strength,
  },
  {
    ...genericCard,
    cardID: 'Escalation',
    cardInfo: cardInfoRecords.Escalation,
    strength: cardInfoRecords.Escalation.strength,
  },
  {
    ...genericCard,
    cardID: 'Maneuver_Sea',
    cardInfo: cardInfoRecords.Maneuver_Sea,
    strength: cardInfoRecords.Maneuver_Sea.strength,
  },
  {
    ...genericCard,
    cardID: 'Redeploy',
    cardInfo: cardInfoRecords.Redeploy,
    strength: cardInfoRecords.Redeploy.strength,
  },
  {
    ...genericCard,
    cardID: 'Blockade',
    cardInfo: cardInfoRecords.Blockade,
    strength: cardInfoRecords.Blockade.strength,
  },
  {
    ...genericCard,
    cardID: 'Super_Battleship',
    cardInfo: cardInfoRecords.Super_Battleship,
    strength: cardInfoRecords.Super_Battleship.strength,
  },
];
