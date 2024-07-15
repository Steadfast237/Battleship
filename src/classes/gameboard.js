import Square from './square';

class Gameboard {
  #rowSize = 10;
  #columnSize = 10;
  #board = [];
  missedShots = [];
  #hits = [];
  #maxNumberOfShips = 0;

  constructor() {
    for (let i = 0; i < this.#rowSize; i++) {
      const row = [];

      for (let y = 0; y < this.#columnSize; y++) {
        row.push(new Square());
      }

      this.#board.push(row);
    }
  }

  get board() {
    return this.#board;
  }

  get hits() {
    return this.#hits;
  }

  get maxNumberOfShips() {
    return this.#maxNumberOfShips;
  }

  getSquare = (rowColumn) => {
    const row = Number(rowColumn.split('_')[0]);
    const column = Number(rowColumn.split('_')[1]);

    if (row > this.#board.length - 1) {
      return undefined;
    }

    return this.#board[row][column];
  };

  #searchNeighbors = (coord, arr, rootCoord) => {
    const coordRow = Number(coord.split('_')[0]);
    const coordCol = Number(coord.split('_')[1]);

    if (!this.#board[coordRow]) return arr;

    arr = !this.#board[coordRow][coordCol - 1]
      ? arr
      : [...arr, `${coordRow}_${coordCol - 1}`];

    arr = coord === rootCoord ? arr : [...arr, coord];

    arr = !this.#board[coordRow][coordCol + 1]
      ? arr
      : [...arr, `${coordRow}_${coordCol + 1}`];

    return arr;
  };

  getNeighbors = (coord) => {
    let neighbors = [];

    const coordRow = Number(coord.split('_')[0]);
    const coordCol = Number(coord.split('_')[1]);
    const topCoord = `${coordRow - 1}_${coordCol}`;
    const bottomCoord = `${coordRow + 1}_${coordCol}`;

    neighbors = this.#searchNeighbors(topCoord, neighbors, coord);
    neighbors = this.#searchNeighbors(coord, neighbors, coord);
    neighbors = this.#searchNeighbors(bottomCoord, neighbors, coord);

    return neighbors;
  };

  placeShip = (ship, coordinates, direction = 'h') => {
    if (ship.length !== coordinates.length) {
      console.log(
        'Make sure your coordinates match the length of you ship/boat'
      );
      return;
    }

    // validate coordinates
    const number = direction === 'h' ? 0 : 1;
    const temp = coordinates[0].split('_')[number];

    if (
      !coordinates
        .map((coord) => coord.split('_')[number])
        .every((row) => row === temp) ||
      coordinates
        .map((coord) => this.getSquare(coord))
        .some((result) => !result)
    ) {
      console.log(
        `Make sure your coordinates are of they same row for horizontal direction or
        they same column for vertical direction and 
        does not cross the board boundaries`
      );
      return;
    }

    if (
      coordinates.every((coord) => {
        const square = this.getSquare(coord);
        return (
          square.value == null &&
          this.getNeighbors(coord)
            .filter((coord) => !coordinates.includes(coord))
            .every((coord) => this.getSquare(coord).value === null)
        );
      })
    ) {
      coordinates.forEach((coord) => {
        const square = this.getSquare(coord);

        square.value = ship;
      });

      this.#maxNumberOfShips++;
    }
  };

  receiveAttack = (coord) => {
    if (this.getSquare(coord).value === null) {
      this.missedShots.push(coord);
      return;
    }

    this.getSquare(coord).value.hit();
    this.#hits.push(coord);

    if (this.getSquare(coord).value.isSunk() && this.#maxNumberOfShips > 0) {
      this.#maxNumberOfShips--;
    }
  };

  isAllShipsSunk() {
    return this.#maxNumberOfShips === 0;
  }

  printBoard = () => {
    const result = this.#board.map((row) =>
      row.map((square) => {
        if (square.value !== null) {
          return square.value.type;
        }

        return square.value;
      })
    );

    console.table(result);

    return result;
  };
}

export default Gameboard;
