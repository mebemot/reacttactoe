import React from "react";
import { ConnectfourSquare } from "./ConnectfourSquare";
import styling from "./C4Board.module.css";

export function ConnectfourBoard({ squares, onClick, winningLine, rowCount, colCount}) {
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
      <ConnectfourSquare
        key={i}
        player={squares[i]}
        onClick={() => onClick(i)}
        winningSquare={winningLine.includes(i)}
      />
    );
  }
}
