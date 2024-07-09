import Gameboard from '../classes/gameboard';
import Player from '../classes/player';
import Ship from '../classes/ship';

class Gamecontroller {
  #activePlayer = undefined;
  #players = undefined;
  #allowedShips = [
    new Ship('battleship', 4),
    new Ship('destroyer', 3),
    new Ship('submarine', 3),
    new Ship('patrol', 2),
    new Ship('patrol', 2),
    new Ship('patrol', 2),
    new Ship('carrier', 1),
    new Ship('carrier', 1),
    new Ship('carrier', 1),
    new Ship('carrier', 1),
  ];

  isGameOver = false;

  constructor() {
    this.#players = [
      new Player(
        'real',
        new Gameboard(this.#allowedShips.length),
        this.#allowedShips
      ),
      new Player(
        'computer',
        new Gameboard(this.#allowedShips.length),
        this.#allowedShips
      ),
    ];

    this.#activePlayer = this.#players[0];

    console.log('Players should secretly arrange their ships.');
    this.randomPlacement(this.#players[1]);
  }

  playRound = (coord = '') => {
    // This check is done because am still trying
    // to play the game in the console
    if (!this.isGameSetup()) {
      console.log('Try arranging all your ships first');
      return;
    }

    if (this.isGameOver) return;

    console.log(
      `Its player ${this.#activePlayer.type === 'real' ? 1 : 2} turn(${
        this.#activePlayer.type
      })`
    );

    const opponentPlayer =
      this.#activePlayer.type === 'real' ? this.#players[1] : this.#players[0];

    if (this.#activePlayer.type === 'computer') {
      coord = this.randomComputerShot(this.#activePlayer);
    }

    // validate the passed coord
    if (
      !opponentPlayer.gameboard.getSquare(coord) ||
      opponentPlayer.gameboard.missedShots.includes(coord) ||
      opponentPlayer.gameboard.hits.includes(coord)
    ) {
      console.log('Please enter a valid coordinate');
      return;
    }

    const tempHits = opponentPlayer.gameboard.hits.length;

    opponentPlayer.gameboard.receiveAttack(coord);

    if (opponentPlayer.gameboard.hits.length > tempHits) {
      const ship = opponentPlayer.gameboard.getSquare(coord).value;

      console.log(`A hit was made on ${ship.type} ship`);

      ship.isSunk() && console.log(`${ship.type} got sunk`);

      if (opponentPlayer.gameboard.isAllShipsSunk()) {
        console.log(`Game OVER!`);
        console.log(`WINNER IS ${this.#activePlayer.type} PLAYER`);
        this.isGameOver = true;
        return;
      }

      console.log(
        `${this.#activePlayer.type} player missed shots: ${
          opponentPlayer.gameboard.missedShots
        }`
      );

      console.log(
        `${this.#activePlayer.type} player hits: ${
          opponentPlayer.gameboard.hits
        }`
      );

      return;
    }

    console.log(
      `${this.#activePlayer.type} player missed shots: ${
        opponentPlayer.gameboard.missedShots
      }`
    );

    console.log(
      `${this.#activePlayer.type} player hits: ${opponentPlayer.gameboard.hits}`
    );

    this.#switchActivePlayer();
  };

  #switchActivePlayer = () => {
    this.#activePlayer =
      this.#activePlayer.type === this.#players[0].type
        ? this.#players[1]
        : this.#players[0];
  };

  randomPlacement(player) {
    if (player.ships.length === 0) return;

    const direction = ['h', 'v'][Math.floor(Math.random() * 2)];

    const board = player.gameboard.board;

    const ship = player.getShip(
      Math.floor(Math.random() * player.ships.length)
    );

    const temp = player.gameboard.maxNumberOfShips;

    while (player.gameboard.maxNumberOfShips === temp) {
      let coordinates = [];
      let row = Math.floor(Math.random() * board.length);
      let column = Math.floor(Math.random() * board.length);

      if (direction === 'h') {
        for (let i = 0; i < ship.length; i++) {
          coordinates.push(`${row}_${column}`);
          column++;
        }

        player.gameboard.placeShip(ship, coordinates, direction);
      } else {
        for (let i = 0; i < ship.length; i++) {
          coordinates.push(`${row}_${column}`);
          row++;
        }

        player.gameboard.placeShip(ship, coordinates, direction);
      }
    }

    player.gameboard.printBoard();
    this.randomPlacement(player);
  }

  randomComputerShot(player) {
    if (player.type === 'computer') {
      const row = Math.floor(Math.random() * player.gameboard.board.length);
      const col = Math.floor(Math.random() * player.gameboard.board.length);

      return `${row}_${col}`;
    }
  }

  isGameSetup = () => {
    return this.#players[0].ships.length === 0 && this.#players[1];
  };

  getActivePlayer = () => {
    return this.#activePlayer;
  };
}

export default Gamecontroller;
