import AbstractView from "../framework/view/abstract-view.js";
import { createFilmDetailsInfo } from "./film-details-info-view.js";
import { createFilmDetailsControls } from "./film-details-controls-view.js";
import { createFilmDetailsCommentsList } from "./film-details-comments-list-view.js";
import { createFilmDetailsNewComment } from "./film-details-new-comment.js";

const createFilmDetailsTemplate = ({ filmInfo }, comments) =>
  `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>

      ${createFilmDetailsInfo(filmInfo)}  

      ${createFilmDetailsControls()}

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

export default class FilmDetailsView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments);
  }

  setFilmDetailsClickHandler(callback) {
    this._callback.click = callback;
    this.element
      .querySelector(".film-details__close-btn")
      .addEventListener("click", this.#clickHandler);
  }

  #clickHandler = evt => {
    evt.preventDefault();
    this._callback.click();
  };
}
