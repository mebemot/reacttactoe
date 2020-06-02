import React from "react";
import "./GamesApp.css";
import { Link } from "react-router-dom";

function GamesNav() {
  const NavStyle = {
    color: "black",
  };
  return (
    <nav className="Nav">
      <div className="drop">
        <Link style={NavStyle} to="/">
          <button className="drop-button">Games</button>
        </Link>
        <div className="drop-content">
          <Link style={NavStyle} to="/tictactoe">
            <li className="link">Tictactoe</li>
          </Link>
          <Link style={NavStyle} to="/connectfour">
            <li className="link">Connectfour</li>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default GamesNav;
