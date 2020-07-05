import React from "react";
import styling from "./GamesNav.module.css";
import { Link } from "react-router-dom";

export default function GamesNav() {
  return (
    <nav className={styling.nav}>
      <div className={styling.drop}>
        <Link className={styling.dropButton} to="/">
          <button tabIndex="-1" className={styling.dropButton}>
            Games
          </button>
        </Link>
        <div className={styling.dropContent}>
          <Link className={styling.link} to="/tictactoe">
            Tic-Tac-Toe
          </Link>
          <Link className={styling.link} to="/connectfour">
            Connect Four
          </Link>
        </div>
      </div>
    </nav>
  );
}
