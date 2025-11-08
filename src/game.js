class Ship {
  constructor(pos, length) {
    this.length = length;
    this.pos = pos;
    this.hits = 0;
    this.horizontal = true;
  }
  hit() {
    this.hits++;
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
  constructor() {
    this.size = 10;
    this.ships = [];
    this.hits = [];
    this.misses = [];
  }
  placeShip(pos, length) {
    this.ships.push(new Ship(pos, length));
  }
  randomizeShips(...lengths) {
    let overlapping = false;
    let pos = [];
    const horizontal = Math.random() >= 0.5;
    const allPos = [];
    for (let i = 0; i < lengths.length; i++) {
      do {
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
        for (let i = 0; i < this.ships.length; i++) {
          if (JSON.stringify(this.ships[i].pos) === JSON.stringify(pos)) {
            overlapping = true;
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
          ship.hit();
          this.hits.push(pos);
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
          ship.hit();
          this.hits.push(pos);
          return true;
        } else {
          this.misses.push(pos);
          return false;
        }
      }
    }
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
    this.gameBoard = new GameBoard();
  }
}

export { Ship, GameBoard, Player };
