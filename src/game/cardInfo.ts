import { AbilityType, TheaterType, OngoingType } from './cards';

export interface CardInfo {
  name: string;
  strength: number;
  desc: string;
  type: AbilityType;
  theater: TheaterType;
  ongoingType?: OngoingType;
}

export const cardInfoRecords: Record<string, CardInfo> = {
  Support: {
    name: 'Support',
    desc: 'You gain +3 strength in each adjacent theater.',
    strength: 1,
    theater: 'air',
    type: 'ongoing',
    ongoingType: 'player',
  },
  Air_Drop: {
    name: 'Air Drop',
    desc: 'On your next turn, you may play a battle card to a non-matching theater.',
    strength: 2,
    theater: 'air',
    type: 'instant',
  },
  Maneuver_Air: {
    name: 'Maneuver',
    desc: 'Flip a battle card in an adjacent theater.',
    strength: 3,
    theater: 'air',
    type: 'instant',
  },
  Aerodrome: {
    name: 'Aerodrome',
    desc: 'You may play battle cards of strength 3 or less to non-matching theaters.',
    strength: 4,
    theater: 'air',
    type: 'ongoing',
    ongoingType: 'player',
  },
  Containment: {
    name: 'Containment',
    desc: 'If either player plays a battle card face-down, immediately discard that card.',
    strength: 5,
    theater: 'air',
    type: 'ongoing',
    ongoingType: 'global',
  },
  Heavy_Bombers: {
    name: 'Heavy Bombers',
    desc: '',
    strength: 6,
    theater: 'air',
    type: 'none',
  },
  Reinforce: {
    name: 'Reinforce',
    desc: 'Look at the top card of the battle deck. You may play it face-down to an adjacent theater.',
    strength: 1,
    theater: 'land',
    type: 'instant',
  },
  Ambush: {
    name: 'Ambush',
    desc: 'Flip a battle card in any theater.',
    strength: 2,
    theater: 'land',
    type: 'instant',
  },
  Maneuver_Land: {
    name: 'Maneuver',
    desc: 'Flip a battle card in an adjacent theater.',
    strength: 3,
    theater: 'land',
    type: 'instant',
  },
  Cover_Fire: {
    name: 'Cover Fire',
    desc: 'All battle cards covered by this card are now strength 4.',
    strength: 4,
    theater: 'land',
    type: 'ongoing',
    ongoingType: 'player',
  },
  Disrupt: {
    name: 'Disrupt',
    desc: 'Your opponent chooses and flips 1 of their battle cards. Then you flip 1 of yours.',
    strength: 5,
    theater: 'land',
    type: 'instant',
  },
  Heavy_Tanks: {
    name: 'Heavy Tanks',
    desc: '',
    strength: 6,
    theater: 'land',
    type: 'none',
  },
  Transport: {
    name: 'Transport',
    desc: 'You may move 1 of your battle cards to a different theater.',
    strength: 1,
    theater: 'sea',
    type: 'instant',
  },
  Escalation: {
    name: 'Escalation',
    desc: 'All of your face-down battle cards are now strength 4.',
    strength: 2,
    theater: 'sea',
    type: 'ongoing',
    ongoingType: 'player',
  },
  Maneuver_Sea: {
    name: 'Maneuver',
    desc: 'Flip a battle card in an adjacent theater.',
    strength: 3,
    theater: 'sea',
    type: 'instant',
  },
  Redeploy: {
    name: 'Redeploy',
    desc: 'Return 1 of your face-down battle cards to your hand. If you do, gain an extra turn.',
    strength: 4,
    theater: 'sea',
    type: 'instant',
  },
  Blockade: {
    name: 'Blockade',
    desc: "If a battle card is played in an adjacent theater with 3 or more cards already in it (counting both players' cards), discard that card with no effect.",
    strength: 5,
    theater: 'sea',
    type: 'ongoing',
    ongoingType: 'global',
  },
  Super_Battleship: {
    name: 'Super Battleship',
    desc: '',
    strength: 6,
    theater: 'sea',
    type: 'none',
  },
};
