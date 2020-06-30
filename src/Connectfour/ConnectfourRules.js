export const colCount = 7;
export const rowCount = 6;
export const winningLineLength = 4;

/**
 * checks for every possible winning line after each turn
 * @returns {[number, [number]] | [null,[null]]} winning player and winning line, null if no winner
 */

export function checkWinner(lastClicked, squares, player) {
  let winningLineVectors = [
    { rowStep: 0, colStep: 1 },
    { rowStep: 1, colStep: 0 },
    { rowStep: 1, colStep: 1 },
    { rowStep: 1, colStep: -1 },
  ];
  for (let { rowStep, colStep } of winningLineVectors) {
    // iterates over the array - performs loop for each element in it
    const [rowPos, colPos] = findStart(lastClicked, rowStep, colStep);

    const potentialWinningLine = getLine(rowPos, colPos, rowStep, colStep);

    const winningLine = checkLine(potentialWinningLine, squares, player);

    if (winningLine.length >= winningLineLength) {
      return [squares[lastClicked], winningLine];
    }
  }
  return [null, [null]];
}

export function indexToCoords(index) {
  let col = index % colCount;
  let row = Math.floor(index / colCount);
  return [row, col];
}

export function coordsToIndex(row, col) {
  let index = row * colCount + col;
  return index;
}

/**
 * works back to the start of a possible winning line
 * @returns {[number, number]} coordinates (row position and col position) of line's start
 */

export function findStart(index, rowStep, colStep) {
  let [currentRow, currentCol] = indexToCoords(index);
  let rowPos = currentRow,
    colPos = currentCol;
  for (
    let i = 1;
    i < winningLineLength && isInGrid(rowPos - rowStep, colPos - colStep); //checks rext row/col position is on grid
    ++i
  ) {
    rowPos -= rowStep;
    colPos -= colStep;
  }
  return [rowPos, colPos];
}

/**
 * fills an array with a potentially winning line
 *@returns {Array<number>} potentially winning line
 */

export function getLine(rowPos, colPos, rowStep, colStep) {
  var potentialWinningLine = [];
  for (; isInGrid(rowPos, colPos); rowPos += rowStep, colPos += colStep) {
    potentialWinningLine.push(coordsToIndex(rowPos, colPos)); //array of line to be checked
  }
  return potentialWinningLine;
}

/**
 * matches contents from squares[] to the current player, if a consecutive match then added to a new array
 * @returns {Array<number>} winningLine
 */

export function checkLine(potentialWinningLine, squares, player) {
  const reducer = (accumulator, currentValue) => {
    if (
      squares[currentValue] === player &&
      accumulator.length < winningLineLength
    ) {
      accumulator.push(currentValue);
    } else if (accumulator.length < winningLineLength) {
      accumulator = [];
    }
    return accumulator;
  };
  var winningLine = potentialWinningLine.reduce(reducer, []);
  return winningLine;
}

export function isInGrid(rowPos, colPos) {
  return rowPos < rowCount && rowPos >= 0 && colPos < colCount && colPos >= 0;
}

/**
 * makes counter "drop" into correct square
 * @returns {boolean | number} false if current column is full or index of where counter has dropped
 */
export function dropCounter(index, squares) {
  let [currentRow, currentCol] = indexToCoords(index);
  let dropRow = 0;
  if (squares[coordsToIndex(dropRow, currentCol)]) {
    return false;
  }
  //drop down column until find counter or bottom of grid
  while (
    dropRow < rowCount &&
    squares[coordsToIndex(dropRow, currentCol)] === null
  ) {
    ++dropRow;
  }
  //adjusts for increment on exiting for loop
  --dropRow;

  return coordsToIndex(dropRow, currentCol);
}
