class Square {
  #value = null;

  get value() {
    return this.#value;
  }

  set value(ship) {
    this.#value = ship;
  }
}

export default Square;
