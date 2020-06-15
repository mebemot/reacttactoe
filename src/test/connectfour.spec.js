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
  test("checkLine(35,36,37,38,39,40,41) returns winning array when starting on player(R,R,R,R, , ,)", () => {
    const squares = new Array(rows * cols).fill(null);
    let player = "Red";
    squares[35] = squares[36] = squares[37] = squares[38] = "Red";
    squares[28] = squares[29] = squares[30] = squares[31] = "Yellow";
    expect(
      checkLine([35, 36, 37, 38, 39, 40, 41], squares, player)
    ).toStrictEqual([35, 36, 37, 38]);
  });
  test("checkLine(35,36,37,38,39,40,41) returns winning array when starting on null( , ,R,R,R,R,)", () => {
    const squares = new Array(rows * cols).fill(null);
    let player = "Red";
    squares[38] = squares[39] = squares[40] = squares[41] = "Red";
    expect(
      checkLine([35, 36, 37, 38, 39, 40, 41], squares, player)
    ).toStrictEqual([38, 39, 40, 41]);
  });
  test("checkLine(35,36,37,38,39,40,41) returns null when starting on null(R,R,R, ,R, ,)", () => {
    const squares = new Array(rows * cols).fill(null);
    let player = "Red";
    squares[35] = squares[36] = squares[37] = squares[39] = "Red";
    expect(
      checkLine([35, 36, 37, 38, 39, 40, 41], squares, player)
    ).toStrictEqual([]);
  });
});


describe("checkWinner(lastClicked, squares) returns [winner,[winningLine]]", () => {
  test("checkWinner(1, squares) with winning line 0 to 3 returns ['playerx',[0, 1, 2, 3]]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[1] = squares[2] = squares[3] = squares[0] = "playerx"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(1, squares, "playerx");
    expect(expectedplayer).toMatch("playerx");
    expect(cells).toStrictEqual([0, 1, 2, 3]);
  });
  test("checkWinner(15, squares) with winning col 1 down to 22 returns ['playerx',[1, 8, 15, 22]]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[1] = squares[8] = squares[15] = squares[22] = "playerx"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(15, squares, "playerx");
    expect(expectedplayer).toMatch("playerx");
    expect(cells).toStrictEqual([1, 8, 15, 22]);
  });
  test("checkWinner(24, squares) with winning SE 8 down to 32 returns ['playerx',[8, 16, 24, 32]]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[8] = squares[16] = squares[24] = squares[32] = "playerx"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(24, squares, "playerx");
    expect(expectedplayer).toMatch("playerx");
    expect(cells).toStrictEqual([8, 16, 24, 32]);
  });
  test("checkWinner(15, squares) with winning SW 6 down to 24 returns ['playerx',[6, 12, 18, 24]]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[6] = squares[12] = squares[18] = squares[24] = "playerx"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(24, squares, "playerx");
    expect(expectedplayer).toMatch("playerx");
    expect(cells).toStrictEqual([6, 12, 18, 24]);
  });

  test("checkWinner(39, squares) with no winner returns null", () => {
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

