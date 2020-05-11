import React from "react";
import { ROWCOUNT, COLCOUNT } from "./Board";

export function Status({ winner, player, stepNumber }) {
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (stepNumber === ROWCOUNT * COLCOUNT) {
    status = "Draw:(";
  } else {
    status = "Next player: " + player;
  }
  return <div>{status}</div>;
}
