import FilmDetailsView from '../view/film-details-view.js';
import { remove, render, replace } from '../framework/render.js'

export default class FilmDetailsPresenter {
  #filmDetailsComponent = null;
  #container = null;
  #closeBtnFilmDetails = null;
  #film = null;
  #comments = null;
  #changeData = null

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

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments, this.#viewData, this.#updateViewData);

    this.#filmDetailsComponent.setFilmDetailsClickHandler(this.#closeBtnFilmDetails);

    this.#filmDetailsComponent.setWatchlistClickHandler(this.#watchlistBtnClickHandler);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#watchedBtnClickHandler);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#favoriteBtnClickHandler);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container.parentElement);
      return;
    }

    replace(this.#filmDetailsComponent, prevFilmDetailsComponent);

    this.#filmDetailsComponent.setScrollPosition();

    remove(prevFilmDetailsComponent);
  }

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  #updateViewData = (viewData) => {
    this.#viewData = {...viewData};
  };

  #watchlistBtnClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    });
  };

  #watchedBtnClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };

  #favoriteBtnClickHandler = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    });
  };
}