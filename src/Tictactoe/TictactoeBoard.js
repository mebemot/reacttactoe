import React from "react";
import { TictactoeSquare } from "./TictactoeSquare";
import styling from "./TictactoeBoard.module.css";

export function TictactoeBoard({ squares, onClick, winningLine, rowCount, colCount }) {
  return <div className={styling.board}>{renderSquares()}</div>;

  function renderSquares() {
    const cells = [];
    const cellCount = rowCount * colCount;
    for (let i = 0; i < cellCount; ++i) {
      cells.push(renderSquare(i));
    }
    return cells;
  }

  function renderSquare(i) {
    return (
      <TictactoeSquare
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        winningSquare={winningLine.includes(i)}
      />
    );
  }
}
