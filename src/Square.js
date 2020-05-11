import React from "react";

export function Square({ value, onClick, winningSquare }) {
  let squareClass = winningSquare ? "square squareWinner" : "square";
  return (
    <button className={squareClass} onClick={onClick}>
      {value}
    </button>
  );
}
