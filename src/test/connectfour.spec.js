import {
  checkWinner,
  coordsToIndex,
  indexToCoords,
  findStart,
  getLine,
  checkLine,
  dropCounter,
} from "../connectfour/ConnectfourRules";

const rows = 6;
const cols = 7;

describe("indexToCoords(index:number) returns [rowPosition:number,colPosition:number]", () => {
  test("top left corner returns [0,0]", () => {
    expect(indexToCoords(0)).toStrictEqual([0, 0]);
  });
  test("bottom right corner returns [5,6]", () => {
    expect(indexToCoords(41)).toStrictEqual([5, 6]);
  });
});

describe("coordsToIndex(rowPosition:number,colPosition:number) returns {index:number}", () => {
  test("top left corner returns 0", () => {
    expect(coordsToIndex(0, 0)).toStrictEqual(0);
  });
  test("bottom right corner returns 41", () => {
    expect(coordsToIndex(5, 6)).toStrictEqual(41);
  });
});

describe("findStart(index:number, rowStep:number,colStep:number) returns [rowPos:number,colPos:number]", () => {
  test("works for horizontal line", () => {
    expect(findStart(6, 0, 1)).toStrictEqual([0, 3]);
  });
  test("stays in grid for horizontal line when counter lands in first column", () => {
    expect(findStart(0, 0, 1)).toStrictEqual([0, 0]);
  });
  test("works for vertical line", () => {
    expect(findStart(41, 1, 0)).toStrictEqual([2, 6]);
  });
  test("stays in grid for vertical line when counter lands in first row", () => {
    expect(findStart(6, 1, 0)).toStrictEqual([0, 6]);
  });
  test("works for SE line", () => {
    expect(findStart(41, 1, 1)).toStrictEqual([2, 3]);
  });
  test("stays in grid for SE line when counter lands bottom left", () => {
    expect(findStart(35, 1, 1)).toStrictEqual([5, 0]);
  });
  test("works for SW line", () => {
    expect(findStart(36, 1, -1)).toStrictEqual([2, 4]);
  });
  test("stays in grid for SW line when counter lands bottom right", () => {
    expect(findStart(41, 1, -1)).toStrictEqual([5, 6]);
  });
});

describe("getLine(rowPos:number, colPos:number, rowStep:number,colStep:number) returns potentialWinningLine[]:number", () => {
  test("retuns a horizontal line that is in the grid from start to end of row", () => {
    expect(getLine(0, 0, 0, 1)).toStrictEqual([0, 1, 2, 3, 4, 5, 6]);
  });
  test("returns a vertical line that is in the grid from start to end of column]", () => {
    expect(getLine(0, 3, 1, 0)).toStrictEqual([3, 10, 17, 24, 31, 38]);
  });
  test("returns a SE diagnal line that is in the grid from the top left corner to the bottom row", () => {
    expect(getLine(0, 0, 1, 1)).toStrictEqual([0, 8, 16, 24, 32, 40]);
  });
  test("returns a SW diagnal line that is in the grid from the top right corner to the bottom row", () => {
    expect(getLine(0, 6, 1, -1)).toStrictEqual([6, 12, 18, 24, 30, 36]);
  });
});

describe("checkLine(potentialWinningLine[]:number) returns winningLine[]:number or []", () => {
  test("winningLine[] when there is a winning line and check starts on player(R,R,R,R, , ,)", () => {
    const squares = new Array(rows * cols).fill(null);
    let player = "Red";
    squares[35] = squares[36] = squares[37] = squares[38] = "Red";
    squares[28] = squares[29] = squares[30] = squares[31] = "Yellow";
    expect(
      checkLine([35, 36, 37, 38, 39, 40, 41], squares, player)
    ).toStrictEqual([35, 36, 37, 38]);
  });
  test("winningLine[] when there is a winning line and check starts on null( , ,R,R,R,R,)", () => {
    const squares = new Array(rows * cols).fill(null);
    let player = "Red";
    squares[38] = squares[39] = squares[40] = squares[41] = "Red";
    expect(
      checkLine([35, 36, 37, 38, 39, 40, 41], squares, player)
    ).toStrictEqual([38, 39, 40, 41]);
  });
  test("[] when there is a a break in the line(R,R,R, ,R, ,)", () => {
    const squares = new Array(rows * cols).fill(null);
    let player = "Red";
    squares[35] = squares[36] = squares[37] = squares[39] = "Red";
    expect(
      checkLine([35, 36, 37, 38, 39, 40, 41], squares, player)
    ).toStrictEqual([]);
  });
  test("winningLine[] only 4 numbers even when more consecutive counters(R,R,R,R,R,R,)", () => {
    const squares = new Array(rows * cols).fill(null);
    let player = "Red";
    squares[35] = squares[36] = squares[37] = squares[38] = squares[39] = squares[40] = squares[41] =
      "Red";
    expect(
      checkLine([35, 36, 37, 38, 39, 40, 41], squares, player)
    ).toStrictEqual([35, 36, 37, 38]);
  });
});

describe("checkWinner(lastClicked:number, squares[]:number) returns [winner:string,winningLine[]:number]", () => {
  test("horizontal winning line", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[1] = squares[2] = squares[3] = squares[0] = "playerx"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(1, squares, "playerx");
    expect(expectedplayer).toMatch("playerx");
    expect(cells).toStrictEqual([0, 1, 2, 3]);
  });
  test("vertical winning line", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[1] = squares[8] = squares[15] = squares[22] = "playerx"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(15, squares, "playerx");
    expect(expectedplayer).toMatch("playerx");
    expect(cells).toStrictEqual([1, 8, 15, 22]);
  });
  test("SE winning line", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[8] = squares[16] = squares[24] = squares[32] = "playerx"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(24, squares, "playerx");
    expect(expectedplayer).toMatch("playerx");
    expect(cells).toStrictEqual([8, 16, 24, 32]);
  });
  test("SW winning line", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[6] = squares[12] = squares[18] = squares[24] = "playerx"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(24, squares, "playerx");
    expect(expectedplayer).toMatch("playerx");
    expect(cells).toStrictEqual([6, 12, 18, 24]);
  });

  test("no winner", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[35] = squares[36] = squares[37] = squares[39] = "playerx"; //setting up winning line
    expect(checkWinner(39, squares, "playerx")).toStrictEqual([null, [null]]);
  });
});

test("dropCouter(0, squares) returns 35, if squares[35] is null", () => {
  const squares = new Array(rows * cols).fill(null);
  expect(dropCounter(0, squares)).toStrictEqual(35);
});
test("dropCouter(27, squares) returns 41, if squares[41] is null", () => {
  const squares = new Array(rows * cols).fill(null);
  expect(dropCounter(27, squares)).toStrictEqual(41);
});
test("dropCouter(0, squares) returns 28, if squares[35] is NOT null", () => {
  const squares = new Array(rows * cols).fill(null);
  squares[35] = "playerx";
  expect(dropCounter(0, squares)).toStrictEqual(28);
});
test("dropCouter(0, squares) returns false, if squares[0] is NOT null", () => {
  const squares = new Array(rows * cols).fill(null);
  squares[0] = "playerx";
  expect(dropCounter(0, squares)).toStrictEqual(false);
});
