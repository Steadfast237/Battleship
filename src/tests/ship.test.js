import Ship from '../classes/ship';

test('submarine got hit', () => {
  const ship = new Ship('submarine', 2);
  ship.hit();
  expect(ship.numberOfHits).toBe(1);
});

test('submarine got sunk up', () => {
  const ship = new Ship('submarine', 2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});

test("submarine can't be hit pass its length", () => {
  const ship = new Ship('submarine', 2);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.numberOfHits).toBe(2);
});
