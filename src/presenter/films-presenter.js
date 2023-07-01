import { remove, render } from "../framework/render.js";
import FilmsSortView from "../view/films-sort-view.js";
import FilmsView from "../view/films-view.js";
import FilmsListView from "../view/films-list-view.js";
import FilmsListContainerView from "../view/films-list-container-view.js";
import FilmButtonMoreView from "../view/film-button-more-view.js";
import NoFilmView from "../view/no-film-view.js";
import FilmDetailsPresenter from "./film-details-presenter.js";
import FilmPresenter from "./film-presenter.js";
import { updateItem } from "../utils/common.js";
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
  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #selectedFilm = null;

  #currentSortType = SortType.DEFAULT;
  #sourceBoardTasks = [];

  #mockFilms = [];

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#mockFilms = [...this.#filmsModel.films];

    this.#sourceBoardTasks = [...this.#filmsModel.films];

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

    if (this.#mockFilms.length === 0) {
      this.#renderNoFilms();
    } else {
      for (
        let i = 0;
        i < Math.min(this.#mockFilms.length, FILM_COUNT_PER_STEP);
        i++
      ) {
        const film = this.#mockFilms[i];
        this.#renderFilm(film);
      }

      if (this.#mockFilms.length > FILM_COUNT_PER_STEP) {
        this.#renderFilmButtonMore();
      }
    }
  };

  #handLoadMoreButtonClick = () => {
    this.#mockFilms
      .slice(
        this.#renderedFilmCount,
        this.#renderedFilmCount + FILM_COUNT_PER_STEP
      )
      .forEach(film => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#mockFilms.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  };

  #sortFilms = sortType => {
    switch (sortType) {
      case SortType.RATING:
        this.#mockFilms.sort(sortFilmsRating);
        break;
      case SortType.DATE:
        this.#mockFilms.sort(sortFilmDate);
        break;
      default:
        this.#mockFilms = [...this.#sourceBoardTasks];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = sortType => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);

    this.#clearFilmList();
    this.#renderFilms();
  };

  #handFilmChange = updatedFilm => {
    this.#mockFilms = updateItem(this.#mockFilms, updatedFilm);
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
