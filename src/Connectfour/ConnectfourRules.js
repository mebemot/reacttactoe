export const colCount = 7;
export const rowCount = 6;
export const winningLineLength = 4;
export function checkWinner(lastClicked, squares, player) {
  let winningLineCombos = [
    { rowStep: 0, colStep: 1 },
    { rowStep: 1, colStep: 0 },
    { rowStep: 1, colStep: 1 },
    { rowStep: 1, colStep: -1 },
  ];
  for (let { rowStep, colStep } of winningLineCombos) {
    // iterates over the array - performs loop for each element in it
    const [rowPos, colPos] = findStart(lastClicked, rowStep, colStep);

    const potentialWinner = getLine(rowPos, colPos, rowStep, colStep);

    const winningLine = checkLine(potentialWinner, squares, player);

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

export function findStart(index, rowStep, colStep) {
  let [currentRow, currentCol] = indexToCoords(index);
  let rowPos = currentRow,
    colPos = currentCol;
  for (
    let i = 0;
    i < winningLineLength && isInGrid(rowPos - rowStep, colPos - colStep); //checks rext row/col position is on grid
    ++i
  ) {
    rowPos -= rowStep;
    colPos -= colStep;
  }
  return [rowPos, colPos];
}
export function getLine(rowPos, colPos, rowStep, colStep) {
  var potentialWinner = [];
  for (; isInGrid(rowPos, colPos); rowPos += rowStep, colPos += colStep) {
    potentialWinner.push(coordsToIndex(rowPos, colPos)); //array of line to be checked
  }
  return potentialWinner;
}

export function checkLine(potentialWinner, squares, player) {
  const reducer = (accumulator, currentValue) => {
    if (squares[currentValue] === player && accumulator.length < winningLineLength) {
      accumulator.push(currentValue);
    } else if (accumulator.length < winningLineLength) {
      accumulator = [];
    }
    return accumulator;
  };
  var winningLine = potentialWinner.reduce(reducer, []);
   return winningLine;
}

export function isInGrid(rowPos, colPos) {
  return rowPos < rowCount && rowPos >= 0 && colPos < colCount && colPos >= 0;
}

export function dropCounter(index, squares) {
  let [currentRow, currentCol] = indexToCoords(index);
  let dropRow = 0;
  //return false if current column is full
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
