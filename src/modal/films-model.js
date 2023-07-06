import Observable from "../framework/observable.js";
import { generateFilms } from "../fish/films.js";

export default class FilmsModel extends Observable {
  #films = generateFilms();

  get films() {
    return this.#films;
  }

  update = (updateType, update) => {
    const index = this.#films.findIndex(item => item.id === update.id);

    if (index === -1) {
      return items;
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
