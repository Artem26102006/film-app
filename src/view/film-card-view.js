import { createElement } from "../render.js";
import { createFilmCardInfo } from "./films-card-info.js";
import { createFilmCardControl } from "./film-card-control.js";

const createTemplate = (film) => 
    `<article class="film-card">
      ${createFilmCardInfo(film)}
      ${createFilmCardControl()}
    </article>`;

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
