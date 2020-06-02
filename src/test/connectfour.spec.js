import {
  checkWinner,
  coordsToIndex,
  indexToCoords,
  findStart,
  getLine,
  checkLine,
} from "../Connectfour/connectfour";

const rows = 6;
const cols = 7;

describe("indexToCoords(index) returns [rowPosition,colPosition]", () => {
  test("indexToCoords(0) returns [0,0]", () => {
    expect(indexToCoords(0)).toStrictEqual([0, 0]);
  });
  test("indexToCoords(41) returns [5,6]", () => {
    expect(indexToCoords(41)).toStrictEqual([5, 6]);
  });
});

describe("coordsToIndex(rowPosition,colPosition) returns index", () => {
  test("coordsToIndex(0,0) returns 0", () => {
    expect(coordsToIndex(0, 0)).toStrictEqual(0);
  });
  test("coordsToIndex(5,6) returns 41", () => {
    expect(coordsToIndex(5, 6)).toStrictEqual(41);
  });
  test("coordsToIndex(1,0) returns 7", () => {
    expect(coordsToIndex(1, 0)).toStrictEqual(7);
  });
});

describe("findStart(index, rowStep,colStep) returns [rowPos,colPos]", () => {
  test("findStart(6, 0, 1) returns [0, 2]", () => {
    expect(findStart(6, 0, 1)).toStrictEqual([0, 2]);
  });
  test("findStart(1, 0, 1) returns [0, 0]", () => {
    expect(findStart(1, 0, 1)).toStrictEqual([0, 0]);
  });
});

describe("getLine(rowPos, colPos, rowStep,colStep) returns [potentialWinningLine]", () => {
  test("HORIZONTAL: getLine(0,3, 0, 1) returns [3, 4, 5, 6]", () => {
    expect(getLine(0, 3, 0, 1)).toStrictEqual([3, 4, 5, 6]);
  });
  test("VERTICAL: getLine(0,3, 1, 0) returns [3, 10, 17, 24, 31, 38]", () => {
    expect(getLine(0, 3, 1, 0)).toStrictEqual([3, 10, 17, 24, 31, 38]);
  });
  test("DIAGNAL SE: getLine(0,3, 1, 1) returns [3, 11, 19, 27]", () => {
    expect(getLine(0, 3, 1, 1)).toStrictEqual([3, 11, 19, 27]);
  });
  test("DIAGNAL SW: getLine(0,3, 1, -1) returns [3, 9, 15, 21]", () => {
    expect(getLine(0, 3, 1, -1)).toStrictEqual([3, 9, 15, 21]);
  });
  test("HORIZONTAL: getLine(0,0, 0, 1) returns [0, 1, 2, 3, 4, 5, 6]", () => {
    expect(getLine(0, 0, 0, 1)).toStrictEqual([0, 1, 2, 3, 4, 5, 6]);
  });
});

describe("checkLine(potentialWinningLine) returns [winningLine] or [null]", () => {
  test("checkLine([0, 1, 2, 3, 4, 5, 6]) returns [0, 1, 2, 3]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[0] = squares[1] = squares[2] = squares[3] = squares[4] = "playery"; //setting up winning line
    expect(checkLine([0, 1, 2, 3, 4, 5, 6], squares)).toStrictEqual([
      0,
      1,
      2,
      3,
    ]);
  });
  test("checkLine([14, 15, 16, 17, 18, 19, 20]) returns null", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[1] = squares[8] = squares[15] = squares[22] = "playerx"; //setting up winning line
    expect(checkLine([14, 15, 16, 17, 18, 19, 20], squares)).toStrictEqual([]);
  });
  test("checkLine([14, 15, 16, 17, 18, 19, 20]) returns 15, 16, 17, 18", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[15] = squares[16] = squares[17] = squares[18] = "playerx"; //setting up winning line
    expect(checkLine([14, 15, 16, 17, 18, 19, 20], squares)).toStrictEqual([
      15,
      16,
      17,
      18,
    ]);
  });
});

describe("checkWinner(lastClicked, squares) returns [winner,[winningLine]]", () => {
  test("checkWinner(1, squares) with winning line 0 to 3 returns ['playerx',[0, 1, 2, 3]]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[1] = squares[2] = squares[3] = squares[0] = "playerx"; //setting up winning line
    let [player, cells] = checkWinner(1, squares);
    expect(player).toMatch("playerx");
    expect(cells).toStrictEqual([0, 1, 2, 3]);
  });
  test("checkWinner(15, squares) with winning col 1 down to 22 returns ['playerx',[1, 8, 15, 22]]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[1] = squares[8] = squares[15] = squares[22] = "playerx"; //setting up winning line
    let [player, cells] = checkWinner(15, squares);
    expect(player).toMatch("playerx");
    expect(cells).toStrictEqual([1, 8, 15, 22]);
  });
  test("checkWinner(24, squares) with winning SE 8 down to 32 returns ['playerx',[8, 16, 24, 32]]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[8] = squares[16] = squares[24] = squares[32] = "playerx"; //setting up winning line
    let [player, cells] = checkWinner(24, squares);
    expect(player).toMatch("playerx");
    expect(cells).toStrictEqual([8, 16, 24, 32]);
  });
  test("checkWinner(15, squares) with winning SW 6 down to 24 returns ['playerx',[6, 12, 18, 24]]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[6] = squares[12] = squares[18] = squares[24] = "playerx"; //setting up winning line
    let [player, cells] = checkWinner(24, squares);
    expect(player).toMatch("playerx");
    expect(cells).toStrictEqual([6, 12, 18, 24]);
  });
});
