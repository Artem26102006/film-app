import AbstractView from "../framework/view/abstract-view.js";
import { createFilmCardInfo } from "./films-card-info.js";
import { createFilmCardControl } from "./film-card-control.js";

const createFilmCardTemplate = (film) => 
    `<article class="film-card">
      ${createFilmCardInfo(film)}
      ${createFilmCardControl(film)}
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
    this._callback.item = item;
    this.element.querySelector('.film-card__poster').addEventListener('click', this.#clickHandler);
  } 

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#clickWatchlistHandler)
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#clickWatchedHandler)
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#clickFavoriteHandler)
  }

  #clickFavoriteHandler = evt => {
    evt.preventDefault();
    this._callback.favoriteClick();
    console.log(this._callback)
  }
  
  #clickWatchedHandler = evt => {
    evt.preventDefault();
    this._callback.watchedClick();
  }
  
  #clickWatchlistHandler = evt => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  #clickHandler = evt => {
    evt.preventDefault();
    this._callback.click(this._callback.item);
  }
}
