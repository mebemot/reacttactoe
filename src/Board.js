import React, { useState } from "react";
import { Square } from "./Square";

export const ROWCOUNT = 3;
export const COLCOUNT = 3;

export function Board({ squares, onClick, winningLine }) {
  let i = 0;

  return <div>{renderRows()}</div>;

  function renderRows() {
    const rows = [];
    let r = 0;
    for (r = 0; r < ROWCOUNT; ++r) {
      rows.push(
        <div key={r} className="board-row">
          {renderCols()}
        </div>
      );
    }
    return rows;
  }

  function renderCols() {
    const cols = [];
    let c = 0;
    for (c = 0; c < COLCOUNT; ++c && ++i) {
      cols.push(renderSquare(i));
    }
    return cols;
  }

  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        winningSquare={winningLine.includes(i)}
      />
    );
  }
}
