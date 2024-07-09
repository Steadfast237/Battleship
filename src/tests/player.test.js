import Gameboard from '../classes/gameboard';
import Player from '../classes/player';
import Ship from '../classes/ship';

test('check the type of player to be computer', () => {
  const cpu = new Player('computer');

  expect(cpu.type).toMatch('computer');
});

test('get the player board', () => {
  const realPlayer = new Player('real', new Gameboard());

  expect(realPlayer.gameboard.printBoard()).toEqual([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
});

test('make sure players have ships at their disposal', () => {
  const realPlayer = new Player('real', new Gameboard(), [
    new Ship('patrol', 2),
    new Ship('submarine', 3),
  ]);

  expect(realPlayer.ships.length).toBe(2);
});
