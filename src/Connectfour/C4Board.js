import React from "react";
import { C4Square } from "./C4Square";
import styling from "./C4Board.module.css";

export function C4Board({ squares, onClick, winningLine, rowCount, colCount }) {
  return <div className={styling.Board}>{renderSquares()}</div>;

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
      <C4Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        winningSquare={winningLine.includes(i)}
      />
    );
  }
}
