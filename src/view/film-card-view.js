import { createElement } from "../render.js";
import { createFilmCardInfo } from "./films-card-info.js";
import { createFilmCardControl } from "./film-card-control.js";

const createTemplate = () => 
    `<article class="film-card">
      ${createFilmCardInfo()}
      ${createFilmCardControl()}
    </article>`;

export default class FilmCardView {
  getTemplate() {
    return createTemplate();
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
