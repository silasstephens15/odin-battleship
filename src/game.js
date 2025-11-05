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
        } else {
          this.misses.push(pos);
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
