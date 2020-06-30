import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GamesApp from "./GamesApp";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<GamesApp />, document.getElementById("root"));
serviceWorker.register();
