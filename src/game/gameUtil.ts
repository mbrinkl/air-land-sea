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
export function CardEffect(
  G: GameState,
  playerID: string,
  cardID: string,
  theaterID: number,
): void {
  //const theater = G.playingField[theaterID].theater;
  switch (cardID) {
    case 'Support':
      break;
    case 'Air_Drop':
      G.players[Number(playerID)].ongoingEffects.push(cardID);
      break;
    case 'Maneuver_Air':
      break;
    case 'Aerodrome':
      G.players[Number(playerID)].ongoingEffects.push(cardID);
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
      G.players[Number(playerID)].ongoingEffects.push(cardID);
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
export function SetValidTheaters(
  G: GameState,
  playerID: string,
  card: Card,
): void {
  let validTheater = card.cardInfo.theater;
  G.playingField.map((theater) => {
    if (G.players[Number(playerID)].ongoingEffects.includes('Air_Drop')) {
      theater.isValid = true;
    } else if (
      G.players[Number(playerID)].ongoingEffects.includes('Aerodrome') &&
      card.strength <= 3
    ) {
      theater.isValid = true;
    } else {
      theater.isValid = theater.theater === validTheater;
    }
  });

  //on the turn after Air Drop is played, this effect should go away
  if (G.players[Number(playerID)].ongoingEffects.includes('Air_Drop')) {
    G.players[Number(playerID)].ongoingEffects.splice(
      G.ongoingEffects.indexOf('Air_Drop'),
      1,
    );
  }
}
export function CalculateCardStrength(
  G: GameState,
  playerID: string,
  card: Card,
): number {
  if (
    card.faceDown &&
    G.players[Number(playerID)].ongoingEffects.includes('Escalation')
  )
    return 4;
  else if (card.faceDown) return 2;
  else return card.strength;
}

//recalculate card strength and total strength for player
export function RecalculateTotalStrength(
  G: GameState,
  playerID: string,
  card: Card,
): void {
  for (let theater of G.playingField) {
    theater.totalStrength[playerID] = 0;
    for (let card of theater.deployedCards[playerID]) {
      card.strength = CalculateCardStrength(G, playerID, card);
      theater.totalStrength[playerID] += card.strength;
    }
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
