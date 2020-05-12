import React from "react";
import "./Square.css";

export function Square({ value, onClick, winningSquare }) {
  let squareClass = winningSquare ? "square squareWinner" : "square";
  return (
    <button className={squareClass} onClick={onClick}>
      {value}
    </button>
  );
}
