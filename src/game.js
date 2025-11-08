class Ship {
  constructor(pos, length) {
    this.length = length;
    this.pos = pos;
    this.hits = 0;
    this.horizontal = true;
  }
  hit(isComputerBoard = false) {
    let isComputer = !isComputerBoard;
    this.hits++;
    const allPos = this.allPos;
    const boundaryTiles = [];
    let tileSet = "computer-tile";
    if (isComputer) {
      tileSet = "human-tile";
    }
    if (this.sunk) {
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
          `#a${boundaryTiles[j][0]}-${boundaryTiles[j][1]}.${tileSet}`
        );
        if (
          boundaryTiles[j][0] >= 0 &&
          boundaryTiles[j][0] <= 9 &&
          boundaryTiles[j][1] >= 0 &&
          boundaryTiles[j][1] <= 9
        ) {
          if (
            !JSON.stringify(this.allPos).includes(
              JSON.stringify(boundaryTiles[j])
            )
          ) {
            tile.classList.add("miss");
            tile.textContent = "X";
          }
        }
      }
    }
  }
  get sunk() {
    return this.hits >= this.length ? true : false;
  }
  get allPos() {
    let allPos = [];
    if (this.horizontal) {
      for (let i = 0; i < this.length; i++) {
        allPos.push([this.pos[0] + i, this.pos[1]]);
      }
    } else {
      for (let i = 0; i < this.length; i++) {
        allPos.push([this.pos[0], this.pos[1] + i]);
      }
    }
    return allPos;
  }
}

class GameBoard {
  constructor(isComputer = false) {
    this.size = 10;
    this.ships = [];
    this.hits = [];
    this.misses = [];
    this.isComputer = isComputer;
  }
  placeShip(pos, length) {
    this.ships.push(new Ship(pos, length));
  }
  randomizeShips(...lengths) {
    let overlapping = false;
    let pos = [];
    const horizontal = Math.random() >= 0.5;
    let allPos = [];
    for (let i = 0; i < lengths.length; i++) {
      const startTime = Date.now();
      do {
        if (Date.now() - startTime > 500) {
          this.ships = [];
          i = 0;
          break;
        }
        allPos = [];
        overlapping = false;
        pos = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
        if (horizontal) {
          for (let j = 0; j < lengths[i]; j++) {
            allPos.push([pos[0] + j, pos[1]]);
          }
        } else {
          for (let j = 0; j < lengths[i]; j++) {
            allPos.push([pos[0], pos[1] + j]);
          }
        }
        if (
          allPos[allPos.length - 1][0] > 9 ||
          allPos[allPos.length - 1][1] > 9
        ) {
          overlapping = true;
        }
        const boundaryTiles = structuredClone(allPos);
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
        outerLoop: for (let j = 0; j < this.ships.length; j++) {
          for (let k = 0; k < this.ships[j].allPos.length; k++) {
            if (
              JSON.stringify(boundaryTiles).includes(this.ships[j].allPos[k])
            ) {
              overlapping = true;
              break outerLoop;
            }
          }
        }
      } while (overlapping);
      this.placeShip(pos, lengths[i]);
      this.ships[this.ships.length - 1].horizontal = horizontal;
    }
  }
  receiveAttack(pos) {
    for (let i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];
      if (ship.horizontal) {
        const upperBound = ship.pos[0] + ship.length;
        if (
          pos[0] >= ship.pos[0] &&
          pos[0] < upperBound &&
          pos[1] === ship.pos[1]
        ) {
          ship.hit(this.isComputer);
          this.hits.push(pos);
          return true;
        } else {
          this.misses.push(pos);
        }
      } else {
        const upperBound = ship.pos[1] + ship.length;
        if (
          pos[1] >= ship.pos[1] &&
          pos[1] < upperBound &&
          pos[0] === ship.pos[0]
        ) {
          ship.hit(this.isComputer);
          this.hits.push(pos);
          return true;
        } else {
          this.misses.push(pos);
        }
      }
    }
    return false;
  }
  get allSunk() {
    let allSunk = true;
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].sunk) {
        allSunk = false;
      }
    }
    return allSunk;
  }
}

class Player {
  constructor(isComputer) {
    this.isComputer = isComputer;
    this.gameBoard = new GameBoard(isComputer);
  }
  aiTurn(gameBoard) {
    let selectedBefore = true;
    let pos = [];
    while (selectedBefore) {
      selectedBefore = false;
      pos = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
      for (let i = 0; i < gameBoard.hits; i++) {
        if (JSON.stringify(gameBoard.hits[i]).contains(JSON.stringify(pos))) {
          selectedBefore = true;
        }
      }
      for (let i = 0; i < gameBoard.misses; i++) {
        if (JSON.stringify(gameBoard.misses[i]).contains(JSON.stringify(pos))) {
          selectedBefore = true;
        }
      }
    }
    const tile = document.querySelector(`#a${pos[0]}-${pos[1]}.human-tile`);
    let turn = true;

    if (gameBoard.receiveAttack(pos)) {
      tile.classList.add("hit");
      this.aiTurn(gameBoard);
      tile.textContent = "X";
    } else {
      tile.classList.add("miss");
      tile.textContent = "X";
    }
  }
}

export { Ship, GameBoard, Player };
