class Player {
  #type = '';
  #gameboard = undefined;
  #ships = undefined;

  constructor(type, gameboard, ships) {
    this.#type = type;
    this.#gameboard = gameboard;
    this.#ships = ships;
  }

  get type() {
    return this.#type;
  }

  get gameboard() {
    return this.#gameboard;
  }

  get ships() {
    return this.#ships;
  }

  getShip = (shipIndex) => {
    const ship = this.#ships[shipIndex];

    this.#ships = this.#ships.filter((_, index) => index !== shipIndex);

    return ship;
  };
}

export default Player;
