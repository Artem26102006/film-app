import FilmDetailsView from '../view/film-details-view.js';
import { remove, render, replace } from '../framework/render.js'

export default class FilmDetailsPresenter {
  #filmDetailsComponent = null;
  #container = null;
  #filmComments = null;
  #closeBtnFilmDetails = null;
  #escClose = null;
  #film = null;
  #comments = null
  #changeData = null

  constructor(container, filmComments, closeBtnFilmDetails, escCLose, handFilmChange) {
    this.#container = container;
    this.#filmComments = filmComments;
    this.#closeBtnFilmDetails = closeBtnFilmDetails;
    this.#escClose = escCLose;
    this.#changeData = handFilmChange;
  }

  init = (film) => {
    this.#comments = [...this.#filmComments.get(film)];
    this.#film = film;
    
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);

    document.body.classList.add("hide-overflow");
    document.addEventListener("keydown", this.#escClose);

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
