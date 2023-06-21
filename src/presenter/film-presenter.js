import FilmCardView from "../view/film-card-view.js";
import { render } from "../framework/render.js";

export default class FilmPresenter {
  #film = null;
  #filmComponent = null;
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
    this.#filmComponent = new FilmCardView(film);

    this.#filmComponent.setFilmClickHandler(this.#setBtnClickHandler, film);
    
    this.#filmComponent.setWatchlistClickHandler(this.#watchlistBtnClickHandler);
    this.#filmComponent.setWatchedClickHandler(this.#watchedBtnClickHandler);
    this.#filmComponent.setFavoriteClickHandler(this.#favoriteBtnClickHandler);

    render(this.#filmComponent, this.#filmsListContainer);
  };

  destroy = () => {
    remove(this.#filmComponent);
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
