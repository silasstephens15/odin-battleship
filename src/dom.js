function generateGameBoard(player) {
  const board = document.createElement("div");
  board.classList.add("game-board");
  for (let i = 0; i < player.gameBoard.size; i++) {
    for (let j = 0; j < player.gameBoard.size; j++) {
      const tile = document.createElement("div");
      tile.id = `${j},${i}`;
      tile.classList.add("tile");
      board.appendChild(tile);
    }
  }
  const body = document.querySelector("body");
  body.appendChild(board);
}

export { generateGameBoard };
