import FilmDetailsView from "../view/film-details-view.js";
import { remove, render, replace } from "../framework/render.js";
import { UserAction, UpdateType } from "../const.js";

export default class FilmDetailsPresenter {
  #filmDetailsComponent = null;
  #container = null;
  #closeBtnFilmDetails = null;
  #film = null;
  #comments = null;
  #changeData = null;

  #viewData = {
    emotion: null,
    comment: null,
    scrollPosition: 0,
  };

  constructor(container, closeBtnFilmDetails, handFilmChange) {
    this.#container = container;
    this.#closeBtnFilmDetails = closeBtnFilmDetails;
    this.#changeData = handFilmChange;
  }

  init = (film, comments) => {
    this.#film = film;
    this.#comments = comments;

    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(
      this.#film,
      this.#comments,
      this.#viewData,
      this.#updateViewData
    );

    this.#filmDetailsComponent.setFilmDetailsClickHandler(
      this.#closeBtnFilmDetails
    );

    this.#filmDetailsComponent.setWatchlistClickHandler(
      this.#watchlistBtnClickHandler
    );
    this.#filmDetailsComponent.setWatchedClickHandler(
      this.#watchedBtnClickHandler
    );
    this.#filmDetailsComponent.setFavoriteClickHandler(
      this.#favoriteBtnClickHandler
    );
    this.#filmDetailsComponent.setDeleteCommentUser(this.#deleteCommentUser);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container.parentElement);
      return;
    }

    replace(this.#filmDetailsComponent, prevFilmDetailsComponent);

    this.#filmDetailsComponent.setScrollPosition();

    remove(prevFilmDetailsComponent);
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  #updateViewData = viewData => {
    this.#viewData = { ...viewData };
  };

  clearViewData = () => {
    this.#updateViewData({
      comment: null,
      emotion: null,
      scrollPosition: this.#viewData.scrollPosition,
    });
  };

  #watchlistBtnClickHandler = () => {
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    });
  };

  #watchedBtnClickHandler = () => {
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };

  #favoriteBtnClickHandler = () => {
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    });
  };

  createComment = () => {
    this.#filmDetailsComponent.setCommentData();

    const {emotion, comment} = this.#viewData;

    if (emotion && comment) {
      this.#changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        this.#film,
        {emotion, comment}
      );
    }
  };

  #deleteCommentUser = commentId => {
    const deletedComment = this.#comments
      .find((comment) => comment.id === commentId);

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      this.#film,
      deletedComment
    );
  };
}
