import React from "react";
import "./GamesApp.css";
import { Link } from "react-router-dom";

export default function GamesNav() {
  const NavStyle = {
    color: "black",
  };
  return (
    <nav className="nav">
      <div className="drop">
        <Link style={NavStyle} to="/">
          <button className="dropButton">Games</button>
        </Link>
        <div className="dropContent">
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

