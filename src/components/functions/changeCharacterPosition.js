import { getCharacterCoords } from "./getCharacterCoords";
import { setCharacterCoords } from "./setCharacterCoords";
import {
  clearCoord,
  changePosition,
  checkForGameOver,
  ifPositionIsLegal,
} from "./moveRabbit";
import {
  freeWolfCoord,
  getAllPossibleDirections,
  getLegalMoves,
  selectMinimumDistanceMove,
  isOnRabbit,
  moveOnBoard,
} from "./moveWolf";

export const changeRabbitPosition = (
  direction,
  board,
  boardSize,
  character,
  gameOverData
) => {
  const rabbitOldCoord = getCharacterCoords(board, character)[0];
  clearCoord(rabbitOldCoord, board);
  const newPosition = changePosition(direction, rabbitOldCoord, boardSize);
  ifPositionIsLegal(newPosition, character, board)
    ? checkForGameOver(newPosition, board, character, gameOverData)
    : setCharacterCoords(board, rabbitOldCoord, character);
};

export const attackRabbit = (board, rabbit, wolf, gameOverData) => {
  const rabbitCoord = getCharacterCoords(board, rabbit)[0];
  const wolvesCoord = getCharacterCoords(board, wolf);
  wolvesCoord.forEach((wolfCoord) => {
    const possibleMoves = getAllPossibleDirections(wolfCoord);
    const legalMoves = getLegalMoves(possibleMoves, board, wolf.forbiddenMoves);
    let minCoord = wolfCoord;
    if (legalMoves.length) {
      minCoord = selectMinimumDistanceMove(legalMoves, rabbitCoord);
    }
    moveWolf(wolfCoord, minCoord, board, gameOverData);
  });
};
const moveWolf = (wolfCoord, coord, board, gameOverData) => {
  freeWolfCoord(wolfCoord, board);
  isOnRabbit(coord, board, gameOverData);
  moveOnBoard(coord, board);
};
