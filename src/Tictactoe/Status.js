import React from "react";
import "./Status.css"

export function Status({ winner, nextPlayer, isDraw }) {
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isDraw) {
    status = "Draw:(";
  } else {
    status = "Next player: " + nextPlayer;
  }
  return <div className="status">{status}</div>;
}
