import React from "react";
import "./C4Square.css";

export function C4Square({ value, onClick, winningSquare }) {
  let squareClass = winningSquare ? "square winner" : "square";
  return (
    <button className={squareClass} onClick={onClick}>
      {value}
    </button>
  );
}
