import React from "react";
import styling from "./C4Status.module.css";

export function ConnectfourStatus({ winner, nextPlayer, isDraw }) {
  let status;
  let counterDisplayed;
  if (winner) {
    status = "Winner: ";
    counterDisplayed = winner;
  } else if (isDraw) {
    status = "Draw:(";
    counterDisplayed = "noCounter";
  } else {
    status = "Next player: ";
    counterDisplayed = nextPlayer;
  }

  return (
    <div className={styling.statusbox}>
      <div>{status}</div>
      <div className={styling[counterDisplayed]}></div>
    </div>
  );
}
