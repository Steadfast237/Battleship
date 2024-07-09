class Ship {
  #length = 0;
  #numberOfHits = 0;

  constructor(type, length) {
    this.#length = length;
    this.type = type;
  }

  get numberOfHits() {
    return this.#numberOfHits;
  }

  get length() {
    return this.#length;
  }

  hit = () => {
    if (this.isSunk()) return;

    this.#numberOfHits++;
  };

  isSunk = () => {
    return this.#numberOfHits === this.#length;
  };
}

export default Ship;
