function generateGameBoard(player) {
  const board = document.createElement("div");
  board.classList.add("game-board");
  for (let i = 0; i < player.gameBoard.size; i++) {
    for (let j = 0; j < player.gameBoard.size; j++) {
      const tile = document.createElement("div");
      tile.id = `${j},${i}`;
      tile.classList.add("tile");
      if (player.isComputer) {
        tile.classList.add("computer-tile");
      }
      board.appendChild(tile);
    }
  }
  const container = document.querySelector("#board-container");
  container.appendChild(board);
}

export { generateGameBoard };
