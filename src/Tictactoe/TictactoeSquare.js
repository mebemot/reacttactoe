import React from "react";
import styling from "./TictactoeSquare.module.css";

export function TictactoeSquare({ value, onClick, winningSquare }) {
  let squareClass = winningSquare ? `${styling.square} ${styling.winner}` : styling.square;
  return (
    <button className={squareClass} onClick={onClick}>
      {value}
    </button>
  );
}
