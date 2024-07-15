import Gameboard from '../classes/gameboard';
import Player from '../classes/player';
import Ship from '../classes/ship';

class Gamecontroller {
  #activePlayer = undefined;
  #players = undefined;
  #opponentPlayer = undefined;
  isGameOver = false;

  constructor() {
    this.#players = [
      new Player('real', new Gameboard(), [
        new Ship('carrier', 5),
        new Ship('battleship', 4),
        new Ship('destroyer', 3),
        new Ship('submarine', 3),
        new Ship('patrol-boat', 2),
      ]),
      new Player('computer', new Gameboard(), [
        new Ship('carrier', 5),
        new Ship('battleship', 4),
        new Ship('destroyer', 3),
        new Ship('submarine', 3),
        new Ship('patrol-boat', 2),
      ]),
    ];

    this.#activePlayer = this.#players[0];

    console.log('Players should secretly arrange their ships.');
  }

  get opponentPlayer() {
    return this.#opponentPlayer;
  }

  reset = () => {
    this.#players = [
      new Player('real', new Gameboard(), [
        new Ship('carrier', 5),
        new Ship('battleship', 4),
        new Ship('destroyer', 3),
        new Ship('submarine', 3),
        new Ship('patrol-boat', 2),
      ]),
      new Player('computer', new Gameboard(), [
        new Ship('carrier', 5),
        new Ship('battleship', 4),
        new Ship('destroyer', 3),
        new Ship('submarine', 3),
        new Ship('patrol-boat', 2),
      ]),
    ];
    this.#activePlayer = this.#players[0];
    this.isGameOver = false;
    this.#opponentPlayer = undefined;
  };

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

    this.#opponentPlayer =
      this.#activePlayer.type === 'real' ? this.#players[1] : this.#players[0];

    if (this.#activePlayer.type === 'computer') {
      coord = this.randomComputerShot();
    }

    // validate the passed coord
    if (
      !this.#opponentPlayer.gameboard.getSquare(coord) ||
      this.#opponentPlayer.gameboard.missedShots.includes(coord) ||
      this.#opponentPlayer.gameboard.hits.includes(coord)
    ) {
      console.log('Please enter a valid coordinate');
      return;
    }

    const tempHits = this.#opponentPlayer.gameboard.hits.length;

    this.#opponentPlayer.gameboard.receiveAttack(coord);

    if (this.#opponentPlayer.gameboard.hits.length > tempHits) {
      const ship = this.#opponentPlayer.gameboard.getSquare(coord).value;

      console.log(`A hit was made on ${ship.type} ship`);

      if (ship.isSunk()) {
        console.log(`${ship.type} got sunk`);

        const row = Number(coord.split('_')[0]);
        const column = Number(coord.split('_')[1]);

        const topCoord = [coord];
        const rightCoord = [coord];
        const bottomCoord = [coord];
        const leftCoord = [coord];
        const result = [];

        for (let i = 1; i < ship.length; i++) {
          topCoord.push(`${row - i}_${column}`);
          rightCoord.push(`${row}_${column + i}`);
          bottomCoord.push(`${row + i}_${column}`);
          leftCoord.push(`${row}_${column - i}`);
        }

        [...topCoord, ...rightCoord, ...bottomCoord, ...leftCoord].forEach(
          (coord) => {
            this.#opponentPlayer.gameboard.hits.includes(coord) &&
              !result.includes(coord) &&
              result.push(coord);
          }
        );

        result.forEach((coord) =>
          this.#opponentPlayer.gameboard
            .getNeighbors(coord)
            .filter(
              (coord) =>
                this.#opponentPlayer.gameboard.getSquare(coord).value === null
            )
            .forEach(
              (coord) =>
                !this.#opponentPlayer.gameboard.missedShots.includes(coord) &&
                this.#opponentPlayer.gameboard.missedShots.push(coord)
            )
        );
      }

      if (this.#opponentPlayer.gameboard.isAllShipsSunk()) {
        console.log(`Game OVER!`);
        console.log(`WINNER IS ${this.#activePlayer.type} PLAYER`);
        this.isGameOver = true;
        return;
      }

      console.log(
        `${this.#activePlayer.type} player missed shots: ${
          this.#opponentPlayer.gameboard.missedShots
        }`
      );

      console.log(
        `${this.#activePlayer.type} player hits: ${
          this.#opponentPlayer.gameboard.hits
        }`
      );

      return;
    }

    console.log(
      `${this.#activePlayer.type} player missed shots: ${
        this.#opponentPlayer.gameboard.missedShots
      }`
    );

    console.log(
      `${this.#activePlayer.type} player hits: ${
        this.#opponentPlayer.gameboard.hits
      }`
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

    // player.gameboard.printBoard();
    this.randomPlacement(player);
  }

  randomComputerShot() {
    const player = this.#activePlayer;

    if (player.type === 'computer') {
      const row = Math.floor(Math.random() * player.gameboard.board.length);
      const col = Math.floor(Math.random() * player.gameboard.board.length);

      return `${row}_${col}`;
    }
  }

  isGameSetup = () => {
    return (
      this.#players[0].ships.length === 0 && this.#players[1].ships.length === 0
    );
  };

  getActivePlayer = () => {
    return this.#activePlayer;
  };

  getPlayers = () => {
    return this.#players;
  };
}

export default Gamecontroller;
