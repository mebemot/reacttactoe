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
    expect(
      checkLine([35, 36, 37, 38, 39, 40, 41], squares, player)
    ).toStrictEqual([35, 36, 37, 38]);
  });
  test("winningLine[] when there is a winning line and check does not start on player( , ,R,R,R,R,)", () => {
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
  test("winningLine[] only 4 numbers even when more consecutive player counters(R,R,R,R,R,R,)", () => {
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
  test("a horizontal winning line is returned along with the winning player", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[1] = squares[2] = squares[3] = squares[0] = "Red"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(1, squares, "Red");
    expect(expectedplayer).toMatch("Red");
    expect(cells).toStrictEqual([0, 1, 2, 3]);
  });
  test("a vertical winning line is returned along with the winning player", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[1] = squares[8] = squares[15] = squares[22] = "Red"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(15, squares, "Red");
    expect(expectedplayer).toMatch("Red");
    expect(cells).toStrictEqual([1, 8, 15, 22]);
  });
  test("a SE winning line is returned along with the winning player", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[8] = squares[16] = squares[24] = squares[32] = "Red"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(24, squares, "Red");
    expect(expectedplayer).toMatch("Red");
    expect(cells).toStrictEqual([8, 16, 24, 32]);
  });
  test("a SW winning line is returned along with the winning player", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[6] = squares[12] = squares[18] = squares[24] = "Red"; //setting up winning line
    let [expectedplayer, cells] = checkWinner(24, squares, "Red");
    expect(expectedplayer).toMatch("Red");
    expect(cells).toStrictEqual([6, 12, 18, 24]);
  });

  test("when there is no winner found [null,[null] is returned]", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[35] = squares[36] = squares[37] = squares[39] = "Red"; //setting up winning line
    expect(checkWinner(39, squares, "Red")).toStrictEqual([null, [null]]);
  });
});

describe("dropCounter(index:number, squares[]:number) returns closest empty index to the bottom(where the counter drops) or false when it cannot drop", () => {
  test("counter drops to bottom row when it is free", () => {
    const squares = new Array(rows * cols).fill(null);
    expect(dropCounter(0, squares)).toStrictEqual(35);
  });
  test("counter drops on top of other counters when they are present", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[35] = "Red";
    expect(dropCounter(0, squares)).toStrictEqual(28);
  });
  test("the counter does not drop (returns false) when the top row is not empty", () => {
    const squares = new Array(rows * cols).fill(null);
    squares[0] = "Red";
    expect(dropCounter(0, squares)).toStrictEqual(false);
  });
});
