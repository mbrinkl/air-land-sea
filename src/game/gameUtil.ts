import { cardInfoRecords } from './cardInfo';
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
//Toggle
export function Flip(
  G: GameState,
  cardIndex: number,
  theaterID: number,
  deployedSideID: string,
): void {
  const cards = G.playingField[theaterID].deployedCards[deployedSideID];
  cards[cardIndex].faceDown = !cards[cardIndex].faceDown;

  //if card face down, remove from ongoing effects Records
  if (cards[cardIndex].faceDown) {
    delete G.ongoingEffects[cards[cardIndex].cardID];
    delete G.players['0'].ongoingEffects[cards[cardIndex].cardID];
    delete G.players['1'].ongoingEffects[cards[cardIndex].cardID];
  }
  //if card now face up, do card effect (I think this always happens? gotta read the rules again)
  if (!cards[cardIndex].faceDown) {
    CardEffect(G, deployedSideID, cards[cardIndex].cardID, theaterID);
  }

  RecalculateTotalStrength(G, deployedSideID);
}
export function CardEffect(
  G: GameState,
  playerID: string,
  cardID: string,
  theaterID: number,
): void {
  //const theater = G.playingField[theaterID].theater;
  const cardInfo = cardInfoRecords[cardID];
  if (cardInfo.type == 'ongoing' && cardInfo.ongoingType == 'player') {
    G.players[playerID].ongoingEffects[cardID] =
      G.playingField[theaterID].theater;
  } else if (cardInfo.type == 'ongoing' && cardInfo.ongoingType == 'global') {
    G.ongoingEffects[cardID] = G.playingField[theaterID].theater;
  }

  //if(cardInfoRecords[cardID].name == 'Maneuver'){
  // let adjacents = GetAdjacentTheaters(G, theaterID);

  //}
  switch (cardID) {
    case 'Support':
      break;
    case 'Air_Drop':
      G.players[playerID].ongoingEffects[cardID] =
        G.playingField[theaterID].theater;
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
export function SetValidTheaters(
  G: GameState,
  playerID: string,
  card: Card,
): void {
  const validTheater = card.cardInfo.theater;
  G.playingField.map((theater) => {
    if ('Air_Drop' in G.players[playerID].ongoingEffects) {
      theater.isValid = true;
    } else if (
      'Aerodrome' in G.players[playerID].ongoingEffects &&
      card.strength <= 3
    ) {
      theater.isValid = true;
    } else {
      theater.isValid = theater.theater === validTheater;
    }
  });

  //on the turn after Air Drop is played, this effect should go away
  delete G.players[playerID].ongoingEffects['Air_Drop'];
}
export function CalculateCardStrength(
  G: GameState,
  playerID: string,
  card: Card,
  theaterID: number,
): number {
  //Escalation: all your facedown cards are now strength 4
  if (card.faceDown && 'Escalation' in G.players[playerID].ongoingEffects)
    return 4;
  //Cover Fire: all cards covered by this card are now strength 4
  else if (
    'Cover_Fire' in G.players[playerID].ongoingEffects &&
    G.playingField[theaterID].theater ==
      G.players[playerID].ongoingEffects['Cover_Fire']
  ) {
    const coverFireCard = G.playingField[theaterID].deployedCards[
      playerID
    ].find((card) => card.cardID == 'Cover_Fire');
    if (
      G.playingField[theaterID].deployedCards[playerID].indexOf(card) <
      G.playingField[theaterID].deployedCards[playerID].indexOf(coverFireCard!)
    ) {
      return 4;
    }
  }
  if (card.faceDown) return 2;
  else return card.cardInfo.strength;
}

//recalculate card strength and total strength for player
export function RecalculateTotalStrength(G: GameState, playerID: string): void {
  //support gives +3 strength to your adjacent theaters
  let adjacents;
  if ('Support' in G.players[playerID].ongoingEffects) {
    adjacents = GetAdjacentTheatersByName(
      G,
      G.players[playerID].ongoingEffects['Support'],
    );
  }
  for (const theater of G.playingField) {
    if (adjacents?.includes(theater.theater))
      theater.totalStrength[playerID] = 3;
    else theater.totalStrength[playerID] = 0;
    for (const card of theater.deployedCards[playerID]) {
      card.strength = CalculateCardStrength(
        G,
        playerID,
        card,
        G.playingField.indexOf(
          G.playingField.find((t) => t.theater == theater.theater)!,
        ),
      );
      theater.totalStrength[playerID] += card.strength;
    }
  }
}

export function GetAdjacentTheatersByName(
  G: GameState,
  theaterName: TheaterType,
): TheaterType[] {
  if (G.playingField[1].theater == theaterName) {
    return [G.playingField[0].theater, G.playingField[2].theater];
  } else {
    return [G.playingField[1].theater];
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
