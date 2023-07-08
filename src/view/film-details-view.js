import AbstractStatefulView from "../framework/view/abstract-stateful-view.js";
import { createFilmDetailsInfo } from "./film-details-info-view.js";
import { createFilmDetailsControls } from "./film-details-controls-view.js";
import { createFilmDetailsCommentsList } from "./film-details-comments-list-view.js";
import { createFilmDetailsNewComment } from "./film-details-new-comment.js";

const createFilmDetailsTemplate = ({
  filmInfo,
  userDetails,
  comments,
  checkedEmotion,
  text,
}) =>
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

        ${createFilmDetailsNewComment(checkedEmotion, text)}

      </section>
    </div>
  </div>
</section>`;

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film, comments, viewData, updateViewData) {
    super();
    this._state = FilmDetailsView.parseFilmToState(
      film,
      comments,
      viewData.emotion,
      viewData.text,
      viewData.scrollPosition
    );

    this.updateViewData = updateViewData;

    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  static parseFilmToState = (
    film,
    comments,
    checkedEmotion = null,
    text = null,
    scrollPosition = 0
  ) => {
    return {
      ...film,
      comments,
      checkedEmotion,
      text,
      scrollPosition,
    };
  };

  _restoreHandlers = () => {
    this.setScrollPosition();
    this.#setInnerHandlers();
    this.setFilmDetailsClickHandler(this._callback.click);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteCommentUser(this._callback.deleteComment)
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
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

  setDeleteCommentUser(callback) {
    this._callback.deleteComment = callback;
    this.element.querySelectorAll(".film-details__comment-delete").forEach(button => {
      button.addEventListener("click", this.#clickDeleteComment)
    });
  }

  #clickDeleteComment = evt => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.deleteComment(evt.target.dataset.commentId);
  };

  #clickFavoriteHandler = evt => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.favoriteClick();
  };

  #clickWatchedHandler = evt => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.watchedClick();
  };

  #clickWatchlistHandler = evt => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.watchlistClick();
  };

  #clickHandler = evt => {
    evt.preventDefault();
    this._callback.click();
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll(".film-details__emoji-item").forEach(item => {
      item.addEventListener("click", this.#emotionClickHandler);
    });

    this.element
      .querySelector(".film-details__comment-input")
      .addEventListener("input", this.#commentInputChangeHandler);
  };

  #emotionClickHandler = evt => {
    evt.preventDefault();
    this.updateElement({
      checkedEmotion: evt.target.value,
      scrollPosition: this.element.scrollTop,
    });
  };

  #commentInputChangeHandler = evt => {
    evt.preventDefault();
    this._setState({ text: evt.target.value });
  };

  #updateViewData = () => {
    this.updateViewData({
      emotion: this._state.checkedEmotion,
      text: this._state.text,
      scrollPosition: this.element.scrollTop,
    });
  };
}
