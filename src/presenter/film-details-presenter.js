import {nanoid} from 'nanoid';
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
    text: null,
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
      text: null,
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

    const {emotion, text} = this.#viewData;

    if (emotion && text) {
      const newCommentId = nanoid();

      const createdComment = {
        id: newCommentId,
        author: 'Artem',
        date: new Date(),
        emotion,
        text
      };

      this.#changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        {
          ...this.#film,
          comments: [
            ...this.#film.comments,
            newCommentId
          ]
        },
        createdComment
      );
    }
  };

  #deleteCommentUser = commentId => {
    const filmCommentIdIndex = this.#film.comments.findIndex(id => id === commentId);

    const deletedComment = this.#comments.find(comment => comment.id === commentId);

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {
        ...this.#film,
        comments: [
          ...this.#film.comments.slice(0, filmCommentIdIndex),
          ...this.#film.comments.slice(filmCommentIdIndex + 1)
        ],
      },
      deletedComment
    );
  };
}
