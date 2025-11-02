import { Ship, GameBoard } from "./src/index.js";

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
  testGameBoard.receiveAttack([0, 1]);
  expect(testGameBoard.ships[0].hits).toBe(1);
  testGameBoard.receiveAttack([1, 0]);
  expect(testGameBoard.ships[0].hits).toBe(2);
});
