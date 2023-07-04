import { remove, render } from "../framework/render.js";
import FilmsSortView from "../view/films-sort-view.js";
import FilmsView from "../view/films-view.js";
import FilmsListView from "../view/films-list-view.js";
import FilmsListContainerView from "../view/films-list-container-view.js";
import FilmButtonMoreView from "../view/film-button-more-view.js";
import NoFilmView from "../view/no-film-view.js";
import FilmDetailsPresenter from "./film-details-presenter.js";
import FilmPresenter from "./film-presenter.js";
import { SortType } from "../const.js";
import { sortFilmsRating, sortFilmDate } from "../utils/common.js";

const FILM_COUNT_PER_STEP = 5;

export default class ListOfFilmsPresenter {
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #films = new FilmsView();
  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();
  #sortComponent = new FilmsSortView();
  #filmButtonMoreComponent = new FilmButtonMoreView();
  #noFilmComponent = new NoFilmView();

  #filmPresenter = new Map();

  #filmDetailsPresenter = null;
  #selectedFilm = null;

  #container = null;

  #filmsModel = null;
  #commentsModel = null;

  #currentSortType = SortType.DEFAULT;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.RATING:
        return [...this.#filmsModel.films].sort(sortFilmsRating);
      case SortType.DATE:
        return [...this.#filmsModel.films].sort(sortFilmDate);
    }

    return this.#filmsModel.films;
  }

  init = () => {
    this.#renderFilms();
  }; 

  #renderSortFilms = () => {
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilmsSection = () => {
    render(this.#films, this.#container);
  };

  #renderFilmsList = () => {
    render(this.#filmsList, this.#films.element);
  };

  #renderFilmsContainer = () => {
    render(this.#filmsListContainer, this.#filmsList.element);
  };

  #renderFilmButtonMore = () => {
    render(this.#filmButtonMoreComponent, this.#filmsList.element);

    this.#filmButtonMoreComponent.setButtonClickHandler(
      this.#handLoadMoreButtonClick
    );
  };

  #renderNoFilms = () => {
    render(this.#noFilmComponent, this.#filmsListContainer.element);
  };

  #renderFilms = () => {
    this.#renderSortFilms();
    this.#renderFilmsSection();
    this.#renderFilmsList();
    this.#renderFilmsContainer();

    if (this.films.length === 0) {
      this.#renderNoFilms();
    } else {
      for (
        let i = 0;
        i < Math.min(this.films.length, FILM_COUNT_PER_STEP);
        i++
      ) {
        const film = this.films[i];
        this.#renderFilm(film);
      }

      if (this.films.length > FILM_COUNT_PER_STEP) {
        this.#renderFilmButtonMore();
      }
    }
  };

  #handLoadMoreButtonClick = () => {
    this.films
      .slice(
        this.#renderedFilmCount,
        this.#renderedFilmCount + FILM_COUNT_PER_STEP
      )
      .forEach(film => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.films.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    
    this.#clearFilmList();
    this.#renderFilms();
  };

  #handFilmChange = updatedFilm => {
    this.#filmsModel.films = updateItem(this.#filmsModel.films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);

    if (
      this.#filmDetailsPresenter &&
      this.#selectedFilm.id === updatedFilm.id
    ) {
      this.#selectedFilm = updatedFilm;
      this.#renderDetailsFilm();
    }
  };

  #renderFilm = film => {
    const filmComponent = new FilmPresenter(
      this.#filmsListContainer.element,
      this.#addFilmDetailsComponent,
      this.#handFilmChange,
      this.#onEscKeyDown
    );

    filmComponent.init(film);
    this.#filmPresenter.set(film.id, filmComponent);
  };

  #renderDetailsFilm = () => {
    const comments = [...this.#commentsModel.get(this.#selectedFilm)];

    if (!this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter(
        this.#container,
        this.#removeFilmDetailsComponent,
        this.#handFilmChange
      );
    }

    this.#filmDetailsPresenter.init(this.#selectedFilm, comments);
  };

  #addFilmDetailsComponent = film => {
    if (this.#selectedFilm && this.#selectedFilm.id === film.id) {
      return;
    }

    if (this.#selectedFilm && this.#selectedFilm.id !== film.id) {
      this.#removeFilmDetailsComponent();
    }

    this.#selectedFilm = film;
    this.#renderDetailsFilm();

    document.body.classList.add("hide-overflow");
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsPresenter.destroy();
    this.#filmDetailsPresenter = null;
    this.#selectedFilm = null;
    document.body.classList.remove("hide-overflow");
    document.removeEventListener("keydown", this.#onEscKeyDown);
  };

  #onEscKeyDown = evt => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener("keydown", this.#onEscKeyDown);
    }
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach(presenter => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#filmButtonMoreComponent);
  };
}
