import "./styles.css";
import { Player } from "./game.js";
import { generateGameBoard, renderShips } from "./dom.js";

let playing = false;

const player1 = new Player(false);
generateGameBoard(player1);

const player2 = new Player(true);
generateGameBoard(player2);

const boardContainer = document.querySelector("#board-container");
const randomButton = document.querySelector("button");
randomButton.addEventListener("click", () => {
  player1.gameBoard.randomizeShips(2, 3, 4, 4, 5);
  const shipTiles = [];
  for (let i = 0; i < player1.gameBoard.ships.length; i++) {
    shipTiles.push(player1.gameBoard.ships[i].allPos);
  }
  renderShips(shipTiles);
});
boardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("computer-tile")) {
    if (
      player2.gameBoard.receiveAttack([
        Number(e.target.id.slice(1, 1)),
        Number(e.target.id.slice(3, 3)),
      ])
    ) {
      e.target.classList.add("hit");
    } else {
      e.target.classList.add("miss");
    }
    e.target.textContent = "X";
  }
});
