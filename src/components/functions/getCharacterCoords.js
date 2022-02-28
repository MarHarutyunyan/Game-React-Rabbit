export const getCharacterCoords = (board, character) => {
  return board.reduce((acc, row, i) => {
    row.reduce((_, cell, j) => {
      if (cell === character.id) {
        acc.push([i, j]);
      }
    }, 0);
    return acc;
  }, []);
};
