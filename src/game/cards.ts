// import { Ctx } from 'boardgame.io';
import { CardInfo, cardInfoRecords } from './cardInfo';
// import { GameState } from './gameTypes';

export type TheaterType = 'air' | 'land' | 'sea';
export type AbilityType = 'ongoing' | 'instant' | 'none';

export interface Card {
  cardID: string;
  cardInfo: CardInfo;
  strength: number;
  covered: boolean;
  faceDown: boolean;
  // effect: (gameState: GameState, ctx: Ctx) => void;
  // flip(): void;
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
  // flip() {
  //   if (!this.covered) {
  //     if (this.faceDown) {
  //       this.strength = this.cardInfo.strength;
  //       this.faceDown = false;
  //     } else {
  //       this.strength = 2;
  //       this.faceDown = true;
  //     }
  //   }
  // },
  // effect: (G, ctx) => {},
};

export const battleCards: Card[] = [
  {
    ...genericCard,
    cardID: 'Support',
    cardInfo: cardInfoRecords.Support,
    strength: cardInfoRecords.Support.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Air_Drop',
    cardInfo: cardInfoRecords.Air_Drop,
    strength: cardInfoRecords.Air_Drop.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Maneuver_Air',
    cardInfo: cardInfoRecords.Maneuver_Air,
    strength: cardInfoRecords.Maneuver_Air.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Aerodrome',
    cardInfo: cardInfoRecords.Aerodrome,
    strength: cardInfoRecords.Aerodrome.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Containment',
    cardInfo: cardInfoRecords.Containment,
    strength: cardInfoRecords.Containment.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Heavy_Bombers',
    cardInfo: cardInfoRecords.Heavy_Bombers,
    strength: cardInfoRecords.Heavy_Bombers.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Reinforce',
    cardInfo: cardInfoRecords.Reinforce,
    strength: cardInfoRecords.Reinforce.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Ambush',
    cardInfo: cardInfoRecords.Ambush,
    strength: cardInfoRecords.Ambush.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Maneuver_Land',
    cardInfo: cardInfoRecords.Maneuver_Land,
    strength: cardInfoRecords.Maneuver_Land.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Cover_Fire',
    cardInfo: cardInfoRecords.Cover_Fire,
    strength: cardInfoRecords.Cover_Fire.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Disrupt',
    cardInfo: cardInfoRecords.Disrupt,
    strength: cardInfoRecords.Disrupt.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Heavy_Tanks',
    cardInfo: cardInfoRecords.Heavy_Tanks,
    strength: cardInfoRecords.Heavy_Tanks.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Transport',
    cardInfo: cardInfoRecords.Transport,
    strength: cardInfoRecords.Transport.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Escalation',
    cardInfo: cardInfoRecords.Escalation,
    strength: cardInfoRecords.Escalation.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Maneuver_Sea',
    cardInfo: cardInfoRecords.Maneuver_Sea,
    strength: cardInfoRecords.Maneuver_Sea.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Redeploy',
    cardInfo: cardInfoRecords.Redeploy,
    strength: cardInfoRecords.Redeploy.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Blockade',
    cardInfo: cardInfoRecords.Blockade,
    strength: cardInfoRecords.Blockade.strength,
    // effect: (G, ctx) => {},
  },
  {
    ...genericCard,
    cardID: 'Super_Battleship',
    cardInfo: cardInfoRecords.Super_Battleship,
    strength: cardInfoRecords.Super_Battleship.strength,
    // effect: (G, ctx) => {},
  },
];
