import FilmCardView from "../view/film-card-view.js";
import { render, replace, remove } from "../framework/render.js";

export default class FilmPresenter {
  #film = null;
  #filmCardComponent = null;
  #filmsListContainer = null;
  #setBtnClickHandler = null;
  #changeData = null;

  constructor(listContainer, setBtnClickHandler, handFilmChange) {
    this.#filmsListContainer = listContainer;
    this.#setBtnClickHandler = setBtnClickHandler;
    this.#changeData = handFilmChange;
  }

  init = film => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setFilmClickHandler(this.#setBtnClickHandler, this.#film);
    
    this.#filmCardComponent.setWatchlistClickHandler(this.#watchlistBtnClickHandler);
    this.#filmCardComponent.setWatchedClickHandler(this.#watchedBtnClickHandler);
    this.#filmCardComponent.setFavoriteClickHandler(this.#favoriteBtnClickHandler);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmsListContainer);
      return;
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);

    remove(prevFilmCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
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
