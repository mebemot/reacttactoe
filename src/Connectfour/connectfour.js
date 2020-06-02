const colCount = 7;
const rowCount = 6;
const winningLineLength = 4;
export function checkWinner(lastClicked, squares) {
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

    const winningLine = checkLine(potentialWinner, squares);

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

export function checkLine(potentialWinner, squares) {
  var winningLine = [];

  for (let i = 0; i < potentialWinner.length; ++i) {
    if (winningLine.length === 0 && squares[potentialWinner[i]]) {
      winningLine.push(potentialWinner[i]);
    } else if (squares[potentialWinner[i]] === squares[winningLine[0]]) {
      winningLine.push(potentialWinner[i]);
    } else if (
      winningLine.length < winningLineLength &&
      squares[potentialWinner[i]]
    ) {
      winningLine = [];
      winningLine.push(potentialWinner[i]);
    }
    if (winningLine.length >= winningLineLength) {
      return winningLine;
    }
  }
  return [];
}

export function isInGrid(rowPos, colPos) {
  return rowPos < rowCount && rowPos >= 0 && colPos < colCount && colPos >= 0;
}
