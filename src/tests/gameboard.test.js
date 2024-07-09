import Gameboard from '../classes/gameboard';
import Ship from '../classes/ship';

/**
 * Before testing make sure the gameboard
 * row and column are of size 3
 */

test('show board', () => {
  const gameboard = new Gameboard(2);

  expect(gameboard.printBoard()).toEqual([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
});

test('place ship at specific coord', () => {
  const patrol = new Ship('patrol', 2);
  const gameboard = new Gameboard(2);

  gameboard.placeShip(patrol, ['0_1', '1_1'], 'v');

  expect(gameboard.printBoard()).toEqual([
    [null, 'patrol', null],
    [null, 'patrol', null],
    [null, null, null],
  ]);
});

test('the length of the coordinate should match that of the ship', () => {
  const patrol = new Ship('patrol', 2);
  const gameboard = new Gameboard(3);

  gameboard.placeShip(patrol, ['0_1', '1_1', '2_1'], 'v');

  expect(gameboard.printBoard()).toEqual([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
});

test('validate  coordinates', () => {
  const patrol = new Ship('patrol', 2);
  const gameboard = new Gameboard(3);

  gameboard.placeShip(patrol, ['0_0', '1_0']);

  expect(gameboard.printBoard()).toEqual([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
});

test("occupied squares can't accept a ship", () => {
  const patrol = new Ship('patrol', 2);
  const gameboard = new Gameboard(2);

  gameboard.placeShip(patrol, ['0_0', '0_0']);

  expect(gameboard.printBoard()).toEqual([
    ['patrol', null, null],
    [null, null, null],
    [null, null, null],
  ]);
});

test("ships can't overlap each other", () => {
  const patrol = new Ship('patrol', 2);
  const submarine = new Ship('submarine', 3);
  const gameboard = new Gameboard(2);

  gameboard.placeShip(patrol, ['0_1', '1_1'], 'v');
  gameboard.placeShip(submarine, ['2_2', '2_0', '2_1']);

  expect(gameboard.printBoard()).toEqual([
    [null, 'patrol', null],
    [null, 'patrol', null],
    [null, null, null],
  ]);
});

test('attack missed', () => {
  const patrol = new Ship('patrol', 2);
  const gameboard = new Gameboard(2);

  gameboard.placeShip(patrol, ['0_0', '1_0']);
  gameboard.receiveAttack('1_1');

  expect(gameboard.missedShots).toEqual(['1_1']);
});

test('sunk all ships', () => {
  const patrol = new Ship('patrol', 2);
  const gameboard = new Gameboard(1);

  gameboard.placeShip(patrol, ['0_0', '1_0'], 'v');
  gameboard.receiveAttack('0_0');
  gameboard.receiveAttack('1_0');

  expect(gameboard.isAllShipsSunk()).toBeTruthy();
});
