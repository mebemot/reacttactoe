import React from "react";
import { Link } from "react-router-dom";

export default function GameLink({ address, styling, image, gameName }) {
  return (
    <Link to={address} className={styling}>
      <header>
        <h2>{gameName}</h2>
      </header>
      <img src={image} alt={gameName}></img>
    </Link>
  );
}
