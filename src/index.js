import "./styles.css";
import { Player } from "./game.js";
import { generateGameBoard, renderShips } from "./dom.js";

let playing = false;
let gameOver = false;

const player1 = new Player(false);
generateGameBoard(player1);
player1.gameBoard.randomizeShips(2, 3, 3, 4, 5);
const shipTiles = [];
for (let i = 0; i < player1.gameBoard.ships.length; i++) {
  shipTiles.push(player1.gameBoard.ships[i].allPos);
}
renderShips(shipTiles);

const player2 = new Player(true);
generateGameBoard(player2);
player2.gameBoard.randomizeShips(2, 3, 3, 4, 5);

const boardContainer = document.querySelector("#board-container");
const randomButton = document.querySelector("button");
const body = document.querySelector("body");
randomButton.addEventListener("click", () => {
  if (!playing) {
    player1.gameBoard.ships = [];
    boardContainer.innerHTML = "";
    generateGameBoard(player1);
    generateGameBoard(player2);
    player1.gameBoard.randomizeShips(2, 3, 3, 4, 5);
    const shipTiles = [];
    for (let i = 0; i < player1.gameBoard.ships.length; i++) {
      shipTiles.push(player1.gameBoard.ships[i].allPos);
    }
    renderShips(shipTiles);
  }
});
boardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("computer-tile") && !gameOver) {
    playing = true;
    if (
      e.target.classList.contains("hit") ||
      e.target.classList.contains("miss")
    ) {
      return;
    }
    if (
      player2.gameBoard.receiveAttack([
        Number(e.target.id.slice(1, 2)),
        Number(e.target.id.slice(3, 4)),
      ])
    ) {
      e.target.classList.add("hit");
    } else {
      e.target.classList.add("miss");
      player2.aiTurn(player1.gameBoard);
    }
    e.target.textContent = "X";
  }
  if (!gameOver) {
    if (player1.gameBoard.allSunk) {
      const victory = document.createElement("h1");
      victory.textContent = "Computer Wins";
      body.appendChild(victory);
      gameOver = true;
    }
    if (player2.gameBoard.allSunk) {
      const victory = document.createElement("h1");
      victory.textContent = "Player Wins";
      body.appendChild(victory);
      gameOver = true;
    }
  }
});
