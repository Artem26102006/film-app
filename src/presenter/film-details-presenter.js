import FilmDetailsView from '../view/film-details-view.js';
import { remove, render, replace } from '../framework/render.js'

export default class FilmDetailsPresenter {
  #filmDetailsComponent = null;
  #container = null;
  #closeBtnFilmDetails = null;
  #film = null;
  #changeData = null

  constructor(container, closeBtnFilmDetails, handFilmChange) {
    this.#container = container;
    this.#closeBtnFilmDetails = closeBtnFilmDetails;
    this.#changeData = handFilmChange;
  }

  init = (film, comments) => {
    this.#film = film;
    
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, comments);

    this.#filmDetailsComponent.setFilmDetailsClickHandler(this.#closeBtnFilmDetails);

    this.#filmDetailsComponent.setWatchlistClickHandler(this.#watchlistBtnClickHandler);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#watchedBtnClickHandler);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#favoriteBtnClickHandler);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container.parentElement);
      return;
    }

    replace(this.#filmDetailsComponent, prevFilmDetailsComponent);

    remove(prevFilmDetailsComponent);
  }

  destroy = () => {
    remove(this.#filmDetailsComponent);
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