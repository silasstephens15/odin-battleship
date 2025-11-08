import { Ship, GameBoard } from "./src/game.js";

test("Sinking works", () => {
  testShip = new Ship([0, 0], 3);
  testShip2 = new Ship([0, 0], 3);
  testShip.hits = 3;
  testShip2.hits = 2;
  expect(testShip.sunk).toBeTruthy();
  expect(testShip2.sunk).toBeFalsy();
});

test("Receive attack", () => {
  testGameBoard = new GameBoard();
  testGameBoard.placeShip([0, 0], 3);
  expect(testGameBoard.ships[0].hits).toBe(0);
  testGameBoard.receiveAttack([0, 0]);
  expect(testGameBoard.ships[0].hits).toBe(1);
  expect(testGameBoard.hits).toContainEqual([0, 0]);
  testGameBoard.receiveAttack([0, 1]);
  expect(testGameBoard.ships[0].hits).toBe(1);
  expect(testGameBoard.misses).toContainEqual([0, 1]);
  testGameBoard.receiveAttack([1, 0]);
  expect(testGameBoard.ships[0].hits).toBe(2);
  testGameBoard.receiveAttack([2, 0]);
  expect(testGameBoard.allSunk).toBeTruthy();
});

test("Ship position", () => {
  testShip = new Ship([0, 0], 3);
  testShip2 = new Ship([3, 3], 2);
  testShip2.horizontal = false;
  expect(testShip.allPos).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
  expect(testShip2.allPos).toEqual([
    [3, 3],
    [3, 4],
  ]);
});
