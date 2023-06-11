import AbstractView from "../framework/view/abstract-view.js";
import { createFilmCardInfo } from "./films-card-info.js";
import { createFilmCardControl } from "./film-card-control.js";

const createFilmCardTemplate = (film) => 
    `<article class="film-card">
      ${createFilmCardInfo(film)}
      ${createFilmCardControl()}
    </article>`;

export default class FilmCardView extends AbstractView{
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setFilmClickHandler(callback, item) {
    this._callback.click = callback;
    this._callback.item = item
    this.element.addEventListener('click', this.#clickHandler) 
  } 

  #clickHandler = evt => {
    evt.preventDefault();
    this._callback.click(this._callback.item);
  }
}
