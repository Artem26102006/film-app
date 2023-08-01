import { remove, render, replace } from "../framework/render.js";
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
import { UpdateType, UserAction } from "../const.js";
import { filter } from "../utils/filter.js";

const FILM_COUNT_PER_STEP = 5;

export default class ListOfFilmsPresenter {
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #films = new FilmsView();
  #filmsList = new FilmsListView();
  #filmsListContainer = new FilmsListContainerView();
  #sortComponent = null;
  #filmButtonMoreComponent = new FilmButtonMoreView();
  #noFilmComponent = new NoFilmView();

  #filmPresenter = new Map();

  #filmDetailsPresenter = null;
  #selectedFilm = null;

  #container = null;

  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #currentSortType = SortType.DEFAULT;

  constructor(container, filmsModel, commentsModel, filterModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;

    const filteredFilms = filter[filterType](films);

    switch (this.#currentSortType) {
      case SortType.RATING:
        return filteredFilms.sort(sortFilmsRating);
      case SortType.DATE:
        return filteredFilms.sort(sortFilmDate);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderFilmBoard();
  };

  #handleSortTypeChange = sortType => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    const films = this.films.slice(
      0,
      Math.min(this.films.length, FILM_COUNT_PER_STEP)
    );
    this.#clearFilmList();
    this.#renderSortFilms();
    this.#renderFilms(films);
  };

  #renderSortFilms = () => {
    if (!this.#sortComponent) {
      this.#sortComponent = new FilmsSortView(this.#currentSortType);
      render(this.#sortComponent, this.#container);
    } else {
      const updatedSortComponent = new FilmsSortView(this.#currentSortType);
      replace(updatedSortComponent, this.#sortComponent);
      this.#sortComponent = updatedSortComponent;
    }

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

  #renderFilms = films => {
    for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
      const film = films[i];
      this.#renderFilm(film);
    }

    if (this.films.length > FILM_COUNT_PER_STEP) {
      this.#renderFilmButtonMore();
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

  #handleViewAction = (actionType, updateType, updateFilm, updateComment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.update(updateType, updateFilm);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, updateComment);
        this.#filmDetailsPresenter.clearViewData();
        this.#filmsModel.update(updateType, updateFilm);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, updateComment);
        this.#filmsModel.update(updateType, updateFilm);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#renderFilmBoard();
        console.log()
        if (this.#filmsModel.films.length === 0) {
          this.#renderNoFilms();
        }
        break;
      case UpdateType.PATCH:
        if (this.#filmPresenter.get(data.id)) {
          this.#filmPresenter.get(data.id).init(data);
        }
        if (this.#filmDetailsPresenter && this.#selectedFilm.id === data.id) {
          this.#selectedFilm = data;
          this.#renderDetailsFilm();
        }
        break;
      case UpdateType.MINOR:
        const films = this.films.slice(
          0,
          Math.min(this.films.length, FILM_COUNT_PER_STEP)
        );
        this.#clearFilmList();
        this.#renderFilms(films);
        break;
      case UpdateType.MAJOR:
        this.#clearFilmBoard({
          resetRenderedFilmCount: true,
          resetSortType: true,
        });
        this.#renderFilmBoard();
        break;
    }
  };

  #renderFilm = film => {
    const filmComponent = new FilmPresenter(
      this.#filmsListContainer.element,
      this.#addFilmDetailsComponent,
      this.#handleViewAction,
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
        this.#handleViewAction
      );
    }

    document.addEventListener("keydown", this.#onCtrlEnterDown);

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

  #renderFilmBoard() {
    const films = this.films.slice(
      0,
      Math.min(this.films.length, FILM_COUNT_PER_STEP)
    );

    this.#renderSortFilms();
    this.#renderFilmsSection();
    this.#renderFilmsList();
    this.#renderFilmsContainer();
    this.#renderFilms(films);
  }

  #clearFilmBoard = ({
    resetRenderedFilmCount = false,
    resetSortType = false,
  } = {}) => {
    this.#filmPresenter.forEach(presenter => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#noFilmComponent);
    remove(this.#filmButtonMoreComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
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

  #onCtrlEnterDown = evt => {
    if (evt.key === "Enter" && (evt.metaKey || evt.ctrlKey)) {
      evt.preventDefault();
      this.#filmDetailsPresenter.createComment();
    }
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach(presenter => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#filmButtonMoreComponent);
  };
}
