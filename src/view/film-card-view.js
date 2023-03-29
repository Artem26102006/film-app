import { createElement } from "../render.js";
import { createFilmCardInfo } from "./films-card-info.js";
import { createFilmCardControl } from "./film-card-control.js";

const createFilmCardTemplate = (film) => 
    `<article class="film-card">
      ${createFilmCardInfo(film)}
      ${createFilmCardControl()}
    </article>`;

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
