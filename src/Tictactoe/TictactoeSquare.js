import React from "react";
import "./Square.css";

export function TictactoeSquare({ value, onClick, winningSquare }) {
  let squareClass = winningSquare ? "square winner" : "square";
  return (
    <button className={squareClass} onClick={onClick}>
      {value}
    </button>
  );
}
