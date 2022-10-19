import { Ctx } from 'boardgame.io';
import { Card, TheaterType } from './cards';
import { GameState } from './gameTypes';

export function getPointsScored(
  firstPlayer: boolean,
  cardsLeft: number,
): number {
  let points = 0;
  if (firstPlayer) {
    switch (cardsLeft) {
      case 6:
      case 5:
      case 4:
        points = 2;
        break;
      case 3:
      case 2:
        points = 3;
        break;
      case 1:
        points = 4;
        break;
      case 0:
        points = 6;
        break;
    }
  } else {
    switch (cardsLeft) {
      case 6:
      case 5:
        points = 2;
        break;
      case 4:
      case 3:
        points = 3;
        break;
      case 2:
        points = 4;
        break;
      case 1:
      case 0:
        points = 6;
        break;
    }
  }
  return points;
}
export function Flip(G: GameState, ctx: Ctx): void {
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
}
export function CardEffect(G: GameState, ctx: Ctx, cardID: string): void {
  switch (cardID) {
    case 'Support':
      break;
    case 'Air_Drop':
      break;
    case 'Maneuver_Air':
      break;
    case 'Aerodrome':
      break;
    case 'Containment':
      break;
    case 'Heavy_Bombers':
      break;
    case 'Reinforce':
      break;
    case 'Ambush':
      break;
    case 'Maneuver_Land':
      break;
    case 'Cover_Fire':
      break;
    case 'Disrupt':
      break;
    case 'Heavy_Tanks':
      break;
    case 'Transport':
      break;
    case 'Escalation':
      break;
    case 'Maneuver_Sea':
      break;
    case 'Redeploy':
      break;
    case 'Blockade':
      break;
    case 'Super_Battleship':
      break;
    default:
      break;
  }
}
export function SetValidTheaters(G: GameState, ctx: Ctx, card: Card): void {
  let validTheater = card.cardInfo.theater;
  G.playingField.map((theater) => {
    //need to check for ongoing effects here
    theater.isValid = theater.theater === validTheater;
  });
}
export function CalculateCardStrength(
  G: GameState,
  player: string,
  card: Card,
): number {
  //need to check for ongoing effects here
  if (card.faceDown) return 2;
  else {
    return card.strength;
  }
}
export function GetAdjacentTheaters(
  G: GameState,
  theaterID: number,
): TheaterType[] {
  if (theaterID === 1) {
    return [G.playingField[0].theater, G.playingField[2].theater];
  } else {
    return [G.playingField[1].theater];
  }
}
