import React from "react";
import { ConnectfourSquare } from "./ConnectfourSquare";
import styling from "./ConnectfourBoard.module.css";

export function ConnectfourBoard({
  squares,
  onClick,
  winningLine,
  rowCount,
  colCount,
}) {
  return <div className={styling.board}>{renderSquares()}</div>;

  /**
   * Renders an array of the length of the number of cells used in the game
   * @returns {Array<string>} squares array
   */
  function renderSquares() {
    const squares = [];
    const squareCount = rowCount * colCount;
    for (let i = 0; i < squareCount; ++i) {
      squares.push(renderSquare(i));
    }
    return squares;
  }

  /**
   * Renders each individual square in the game
   */
  function renderSquare(i) {
    return (
      <ConnectfourSquare
        key={i}
        player={squares[i]}
        onClick={() => onClick(i)}
        winningSquare={winningLine.includes(i)}
      />
    );
  }
}
