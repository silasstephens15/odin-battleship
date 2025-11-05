import "./styles.css";
import { Player } from "./game.js";
import { generateGameBoard } from "./dom.js";

const player1 = new Player(false);
generateGameBoard(player1);
