import AbstractStatefulView from "../framework/view/abstract-stateful-view.js";
import { createFilmDetailsInfo } from "./film-details-info-view.js";
import { createFilmDetailsControls } from "./film-details-controls-view.js";
import { createFilmDetailsCommentsList } from "./film-details-comments-list-view.js";
import { createFilmDetailsNewComment } from "./film-details-new-comment.js";

const createFilmDetailsTemplate = ({ filmInfo, userDetails, comments }) =>
  `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>

      ${createFilmDetailsInfo(filmInfo)}  

      ${createFilmDetailsControls(userDetails)}

    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${
          comments.length
        }</span></h3>

        ${createFilmDetailsCommentsList(comments)}

        ${createFilmDetailsNewComment()}

      </section>
    </div>
  </div>
</section>`;

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film, comments) {
    super();
    this._state = FilmDetailsView.parseFilmToState(film, comments);
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  static parseFilmToState = (film, comments) => {
    return {
      ...film,
      comments,
      emoji: null,
    };
  };

  static parseStateToFilm = (state) => {
    const film = {...state};

    if (!film.emoji) {
      film.emoji = null;
    }

    delete film.emoji;

    return film;
  };

  setFilmDetailsClickHandler(callback) {
    this._callback.click = callback;
    this.element
      .querySelector(".film-details__close-btn")
      .addEventListener("click", this.#clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.element
      .querySelector(".film-details__control-button--watchlist")
      .addEventListener("click", this.#clickWatchlistHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.element
      .querySelector(".film-details__control-button--watched")
      .addEventListener("click", this.#clickWatchedHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector(".film-details__control-button--favorite")
      .addEventListener("click", this.#clickFavoriteHandler);
  }

  #clickFavoriteHandler = evt => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #clickWatchedHandler = evt => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #clickWatchlistHandler = evt => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #clickHandler = evt => {
    evt.preventDefault();
    this._callback.click();
  };
}
