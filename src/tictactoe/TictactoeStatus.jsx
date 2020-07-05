import React from "react";
import styling from "./TictactoeStatus.module.css";

export function TictactoeStatus({ winner, nextPlayer, isDraw }) {
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isDraw) {
    status = "Draw:(";
  } else {
    status = "Next player: " + nextPlayer;
  }
  return <div className={styling.status}>{status}</div>;
}
