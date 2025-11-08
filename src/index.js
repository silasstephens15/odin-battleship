import "./styles.css";
import { Player } from "./game.js";
import { generateGameBoard } from "./dom.js";

let playing = false;

const player1 = new Player(false);
generateGameBoard(player1);

const player2 = new Player(true);
generateGameBoard(player2);

const boardContainer = document.querySelector("#board-container");
const randomButton = document.querySelector("button");
randomButton.addEventListener("click", () => {});
boardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("computer-tile")) {
    if (player2.gameBoard.receiveAttack(JSON.parse(`[${e.target.id}]`))) {
      e.target.classList.add("hit");
    } else {
      e.target.classList.add("miss");
    }
    e.target.textContent = "X";
  }
});
