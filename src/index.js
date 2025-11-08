import "./styles.css";
import { Player } from "./game.js";
import { generateGameBoard, renderShips } from "./dom.js";

let playing = false;

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
randomButton.addEventListener("click", () => {
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
});
boardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("computer-tile")) {
    if (
      player2.gameBoard.receiveAttack([
        Number(e.target.id.slice(1, 2)),
        Number(e.target.id.slice(3, 4)),
      ]) &&
      !(
        e.target.classList.contains("hit") ||
        e.target.classList.contains("miss")
      )
    ) {
      e.target.classList.add("hit");
      for (let i = 0; i < player2.gameBoard.ships.length; i++) {
        if (player2.gameBoard.ships[i].sunk) {
          const allPos = player2.gameBoard.ships[i].allPos;
          const boundaryTiles = [];
          for (let j = 0; j < allPos.length; j++) {
            boundaryTiles.push([allPos[j][0] + 1, allPos[j][1]]);
            boundaryTiles.push([allPos[j][0] - 1, allPos[j][1]]);
            boundaryTiles.push([allPos[j][0], allPos[j][1] + 1]);
            boundaryTiles.push([allPos[j][0], allPos[j][1] - 1]);
            boundaryTiles.push([allPos[j][0] + 1, allPos[j][1] + 1]);
            boundaryTiles.push([allPos[j][0] - 1, allPos[j][1] - 1]);
            boundaryTiles.push([allPos[j][0] + 1, allPos[j][1] - 1]);
            boundaryTiles.push([allPos[j][0] - 1, allPos[j][1] + 1]);
          }
          for (let j = 0; j < boundaryTiles.length; j++) {
            const tile = document.querySelector(
              `#a${boundaryTiles[j][0]}-${boundaryTiles[j][1]}.computer-tile`
            );
            if (
              boundaryTiles[j][0] >= 0 &&
              boundaryTiles[j][0] <= 9 &&
              boundaryTiles[j][1] >= 0 &&
              boundaryTiles[j][1] <= 9
            ) {
              tile.classList.add("miss");
              tile.textContent = "X";
            }
          }
        }
      }
    } else {
      e.target.classList.add("miss");
    }
    e.target.textContent = "X";
  }
});
