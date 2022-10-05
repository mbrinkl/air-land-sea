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
